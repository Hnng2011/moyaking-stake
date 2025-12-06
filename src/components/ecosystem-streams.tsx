import { Info, LockIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  cn,
  fetchMetadata,
  formatUnlockTimeUS,
  getRarity,
  parseIpfsUrl,
} from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { streams } from "@/fake-data";
import { RarityColor, RarityStakingPower } from "@/constants/rarity";
import { useReadContract, useConnection } from "wagmi";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
} from "@/constants/blockchain";
import { Spinner } from "./ui/spinner";

// --- Animation Variants ---
const modalVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
};

// --- Child Component: StreamCard ---
interface StreamCardProps {
  id: bigint; // Bạn nên thay 'any' bằng interface Stream cụ thể nếu có
  onHoverStart: (stream: any) => void;
  onHoverEnd: () => void;
}

const StreamCard = ({ id, onHoverStart, onHoverEnd }: StreamCardProps) => {
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

  const [NFTData, setNFTData] = useState<any>(undefined);

  const rarity: keyof typeof RarityColor | null = useMemo(() => {
    return getRarity(id);
  }, [id]);

  useEffect(() => {
    const loadNFTData = async () => {
      if (nftIPFSString) {
        const res = await fetchMetadata(nftIPFSString as string);
        setNFTData(res);
      }
    };

    loadNFTData();
  }, [nftIPFSString]);

  const { data: stakeInfo } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getStakeInfo",
    args: [id],
  });

  return (
    <Card className="p-0 group relative border-0 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          loading="lazy"
          src={parseIpfsUrl(NFTData?.image)}
          alt={NFTData?.name}
          className="w-full h-full object-cover brightness-[0.4] blur-sm group-hover:blur-md transition-all duration-500"
        />
      </div>

      <CardContent className="relative z-10 flex flex-col h-full min-h-[360px] p-6">
        {/* Header: Rarity & Info */}
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "py-1 px-2.5 rounded-lg border text-[10px] font-bold tracking-wider",
                rarity && RarityColor[rarity]
              )}
            >
              {rarity && (rarity as string).toUpperCase()}
            </span>
            <span
              className={cn(
                "py-1 px-2.5 rounded-lg border text-[10px] font-bold",
                rarity && RarityColor[rarity]
              )}
            >
              {rarity && RarityStakingPower[rarity]}%
            </span>
          </div>
          <Info className="w-5 h-5 text-white/40 hover:text-white transition-colors cursor-help" />
        </div>

        {/* Main Content: Image & Name */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 my-4">
          <motion.div
            className="relative w-32 h-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden cursor-pointer flex items-center justify-center"
            onHoverStart={() =>
              onHoverStart({
                name: NFTData?.name,
                image: parseIpfsUrl(NFTData?.image),
              })
            }
            onHoverEnd={onHoverEnd}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
          >
            {ifpsLoading ? (
              <Spinner className="size-8 text-white" />
            ) : (
              <img
                loading="lazy"
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
            <div className="inline-block bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1">
              <span className="text-purple-200 font-bold text-sm">
                {(stakeInfo as any[])?.[5] ?? 0} POINT
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          disabled={!(stakeInfo as any[])?.[6]}
          className="w-full bg-white text-black hover:text-white disabled:bg-zinc-900 disabled:text-zinc-400 font-semibold rounded-xl transition-all"
        >
          {!(stakeInfo as any[])?.[6] ? (
            <div className="flex items-center">
              <span className="text-xs text-wrap inline-flex gap-2 items-center">
                <LockIcon /> Until{" "}
                {formatUnlockTimeUS((stakeInfo as any[])?.[4])}
              </span>
            </div>
          ) : (
            "Claim Points"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

// --- Main Component: EcosystemStreams ---
export function EcosystemStreams() {
  const { address } = useConnection();
  const [activeNFT, setActiveNFT] = useState<any | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { data: listNFTs } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getUserStakedNFTs",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const handleHoverStart = (info: bigint) => {
    timerRef.current = setTimeout(() => setActiveNFT(info), 500);
  };

  const handleHoverEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="space-y-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/5">
        <div>
          <h2 className="text-2xl font-bold text-white">Staking Zone</h2>
          <p className="text-gray-400 text-sm mt-1">
            Earn rewards by staking MOYAKING
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-8 font-medium transition-colors">
          Claim all
        </Button>
      </div>

      {/* Modal / Preview Overlay */}
      <AnimatePresence>
        {activeNFT && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveNFT(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xl"
            />
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <img
                src={activeNFT.image}
                alt={activeNFT.name}
                className="w-full h-full object-contain bg-black/20"
              />
              <button
                onClick={() => setActiveNFT(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-0 inset-x-0 p-8 bg-linear-to-t from-black/90 to-transparent">
                <h3 className="text-3xl font-bold text-white">
                  {activeNFT.name}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(!streams || streams.length === 0) && (
          <div className="min-h-64 flex items-center justify-center col-span-full text-zinc-400">
            There is no Staking NFT(s) yet
          </div>
        )}

        {(listNFTs as bigint[])?.map((id: bigint) => (
          <StreamCard
            key={Number(id)}
            id={id}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />
        ))}
      </div>
    </div>
  );
}
