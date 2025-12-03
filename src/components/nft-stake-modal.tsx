import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Stream } from "@/fake-data";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { MonthLabel, RarityColor } from "@/constants/rarity";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState, useMemo } from "react";
import { CircleCheck } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

// --- Types ---
interface NFTStakeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  streams: Stream[] | null;
}

interface SelectedItem {
  name: string;
  time: number;
}

// --- Sub-Component: StreamCard (Tách ra để code gọn hơn) ---
interface StreamCardProps {
  stream: Stream;
  isSelected: boolean;
  selectedTime?: number;
  onToggle: (name: string) => void;
  onTimeChange: (name: string, time: number) => void;
}

const StreamCard = ({
  stream,
  isSelected,
  selectedTime,
  onToggle,
  onTimeChange,
}: StreamCardProps) => {
  return (
    <div onClick={() => onToggle(stream.name)}>
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
            src={stream.backgroundImage}
            alt={stream.name}
            className="w-full h-full object-cover brightness-50 transition-all duration-500"
          />
        </div>

        <CardContent className="relative z-10 flex flex-col items-center justify-between h-full p-6 text-center">
          {!isSelected ? (
            <>
              <div
                className={cn(
                  "flex items-end gap-2 absolute top-0 delay-100 transition-transform duration-300",
                  isSelected && "-translate-y-20 delay-0"
                )}
              >
                <div
                  className={cn(
                    "py-1 px-3 rounded-lg border text-xs",
                    RarityColor[stream.rarity as keyof typeof RarityColor]
                  )}
                >
                  {stream.rarity.toUpperCase()}
                </div>
                <div
                  className={cn(
                    "py-1 px-3 rounded-lg border text-xs",
                    RarityColor[stream.rarity as keyof typeof RarityColor]
                  )}
                >
                  {stream.power}%
                </div>
              </div>

              <h3
                className={cn(
                  "text-xl font-bold text-white tracking-wide absolute bottom-0 delay-100 transition-transform duration-300",
                  isSelected && "translate-y-20 delay-0"
                )}
              >
                {stream.name}
              </h3>
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
                      onTimeChange(stream.name, timeValue);
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
  const [selected, setSelected] = useState<SelectedItem[]>([]);

  useEffect(() => {
    if (open) setSelected([]);
  }, [open]);

  const handleToggleStream = useCallback((name: string) => {
    setSelected((prev) => {
      const exists = prev.some((item) => item.name === name);
      if (exists) {
        return prev.filter((item) => item.name !== name);
      }
      return [...prev, { name, time: 1 }]; // Default 1 month
    });
  }, []);

  const handleTimeChange = useCallback((name: string, time: number) => {
    setSelected((prev) =>
      prev.map((item) => (item.name === name ? { ...item, time } : item))
    );
  }, []);

  const handleStake = () => {
    onOpenChange(false);
  };

  if (!streams) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="px-0 w-fit">
        <Button className="text-white/90 text-lg w-fit relative lg:translate-y-32 lg:group-hover:translate-y-0 transition-transform">
          Stake
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-[900px] max-h-[85vh] overflow-hidden bg-zinc-900 border-0 p-0 rounded-4xl">
        <ScrollArea className="h-[70vh] p-8 md:p-12 rounded-3xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-6 h-full pb-8">
            {streams.map((stream) => {
              const selectedItem = selected.find((s) => s.name === stream.name);
              return (
                <StreamCard
                  key={stream.name}
                  stream={stream}
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
      </DialogContent>
    </Dialog>
  );
}
