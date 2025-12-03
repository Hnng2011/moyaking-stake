import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Stream } from "@/fake-data";
import { cn, fetchMetadata, getRarity, parseIpfsUrl } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import {
  MonthLabel,
  RarityColor,
  RarityStakingPower,
} from "@/constants/rarity";
import { Button } from "./ui/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CircleCheck } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useConnection, useReadContract } from "wagmi";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
} from "@/constants/blockchain";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Spinner } from "./ui/spinner";

// --- Types ---
interface NFTStakeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  streams: Stream[] | null;
}

interface SelectedItem {
  id: bigint;
  time: number;
}

// --- Sub-Component: StreamCard (Tách ra để code gọn hơn) ---
interface StreamCardProps {
  id: bigint;
  isSelected: boolean;
  selectedTime?: number;
  onToggle: (id: bigint) => void;
  onTimeChange: (id: bigint, time: number) => void;
}

const StreamCard = ({
  id,
  isSelected,
  selectedTime,
  onToggle,
  onTimeChange,
}: StreamCardProps) => {
  const { data: nftIPFSString, isLoading: ifpsLoading } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "tokenURI",
    args: [id],
    query: {
      enabled: !!id,
      refetchInterval: 0,
    },
  });

  const { data: stakeInfo } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "getStakeInfo",
    args: [id],
  });

  const [NFTData, setNFTData] = useState<any>(undefined);

  const rarity: keyof typeof RarityColor | null = useMemo(() => {
    return getRarity(id);
  }, [getRarity, id]);

  useEffect(() => {
    const loadNFTData = async () => {
      if (nftIPFSString) {
        const res = await fetchMetadata(nftIPFSString as string);
        setNFTData(res);
      }
    };

    loadNFTData();
  }, [nftIPFSString]);

  return (
    <div onClick={() => onToggle(id)}>
      <Card className="group relative border-2 border-zinc-600 rounded-3xl bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-95 overflow-hidden h-[360px]">
        <div
          className={cn(
            "opacity-0 bg-black absolute inset-0 z-10 duration-100",
            isSelected && "opacity-50"
          )}
        />

        <div
          className={cn(
            "opacity-0 absolute right-4 top-4 z-20 duration-100",
            isSelected && "delay-300 opacity-100"
          )}
        >
          <CircleCheck className="w-6 h-6 text-purple-700" />
        </div>

        <div className="absolute inset-0 z-0">
          <img
            src={parseIpfsUrl(NFTData?.image)}
            alt={NFTData?.name}
            className="w-full h-full object-cover brightness-[0.4] blur-sm group-hover:blur-md transition-all duration-500"
          />
        </div>

        <CardContent className="relative z-10 flex flex-col items-center justify-between h-full p-6 text-center">
          {!isSelected ? (
            <>
              <div className="flex-1 flex flex-col items-center justify-center gap-6 my-4">
                <motion.div
                  className="relative w-32 h-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden cursor-pointer flex items-center justify-center"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                >
                  {ifpsLoading ? (
                    <Spinner className="size-8 text-white" />
                  ) : (
                    <img
                      src={parseIpfsUrl(NFTData?.image ?? "")}
                      alt={NFTData?.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white truncate max-w-[200px]">
                    {NFTData?.name}
                  </h3>
                </div>
              </div>

              <div
                className={cn(
                  "flex items-end gap-2 absolute top-0 delay-100 transition-transform duration-300",
                  isSelected && "-translate-y-20 delay-0"
                )}
              >
                <div
                  className={cn(
                    "py-1 px-3 rounded-lg border text-xs",
                    rarity && RarityColor[rarity]
                  )}
                >
                  {rarity && (rarity as string).toUpperCase()}
                </div>
                <div
                  className={cn(
                    "py-1 px-3 rounded-lg border text-xs",
                    rarity && RarityColor[rarity]
                  )}
                >
                  {rarity && RarityStakingPower[rarity]}%
                </div>
              </div>
            </>
          ) : (
            <div className="text-white flex flex-col h-full w-full items-center justify-center gap-3 animate-in fade-in zoom-in duration-300">
              {Object.entries(MonthLabel).map(([key, value]) => {
                const timeValue = Number(key);
                return (
                  <Button
                    key={key}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent toggling card selection
                      onTimeChange(id, timeValue);
                    }}
                    className={cn(
                      "w-full bg-zinc-600 text-black hover:bg-zinc-500 transition-colors",
                      selectedTime === timeValue &&
                        "bg-zinc-200 hover:bg-zinc-200"
                    )}
                  >
                    {value}
                  </Button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export function NFTStakeModal({
  open,
  onOpenChange,
  streams,
}: NFTStakeModalProps) {
  const { address } = useConnection();
  const [selected, setSelected] = useState<SelectedItem[]>([]);

  const { data, isLoading, isError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getUserWalletNFTs",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const handleToggleStream = useCallback((id: bigint) => {
    setSelected((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (exists) {
        return prev.filter((item) => item.id !== id);
      }
      return [...prev, { id, time: 1 }];
    });
  }, []);

  const handleTimeChange = useCallback((id: bigint, time: number) => {
    setSelected((prev) =>
      prev.map((item) => (item.id === id ? { ...item, time } : item))
    );
  }, []);

  const handleStake = () => {
    onOpenChange(false);
  };

  useEffect(() => {
    if (open) setSelected([]);
  }, [open]);

  useEffect(() => {
    if (isError) toast.error("Error loading your NFT(s)");
  }, [isError]);

  if (!streams || !address) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="px-0 w-fit">
        <Button className="text-white/90 text-lg w-fit relative lg:translate-y-32 lg:group-hover:translate-y-0 transition-transform">
          Stake
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-[900px] max-h-[85vh] overflow-hidden bg-zinc-900 border-0 p-0 rounded-4xl">
        {!isLoading ? (
          <>
            <ScrollArea className="h-[70vh] p-8 md:p-12 rounded-3xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-6 h-full pb-8">
                {(data as bigint[] | undefined)?.map((id) => {
                  const selectedItem = selected.find((s) => s.id === id);

                  return (
                    <StreamCard
                      key={Number(id)}
                      id={id}
                      isSelected={!!selectedItem}
                      selectedTime={selectedItem?.time}
                      onToggle={handleToggleStream}
                      onTimeChange={handleTimeChange}
                    />
                  );
                })}
              </div>
            </ScrollArea>

            <DialogFooter className="absolute bottom-0 min-h-[61px] w-[98%] bg-zinc-900/90 backdrop-blur p-3 z-50 border-t border-zinc-800">
              {selected.length > 0 && (
                <Button
                  onClick={handleStake}
                  className="w-full md:w-fit bg-purple-700 hover:bg-purple-600 transition-colors ml-auto"
                >
                  Stake {selected.length} NFT(s)
                </Button>
              )}
            </DialogFooter>
          </>
        ) : (
          <div className="text-white min-h-[700px] flex w-full justify-center items-center">
            Loading...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
