import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Stream } from "@/fake-data";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { RarityColor } from "@/constants/rarity";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface NFTStakeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  streams: Stream[] | null;
}

export function NFTStakeModal({
  open,
  onOpenChange,
  streams,
}: NFTStakeModalProps) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([]);
  }, [open]);

  if (!streams) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="w-fit">
        <Button
          onClick={() => onOpenChange(true)}
          className="text-white/90 text-lg w-fit relative lg:translate-y-16 lg:group-hover:translate-y-0"
        >
          Stake
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-[900px] max-h-[80vh] overflow-hidden bg-zinc-900 border-0 p-0 rounded-4xl">
        <ScrollArea className="h-[70vh] p-12 rounded-3xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-4 cursor-pointer h-full">
            {streams.map((stream) => (
              <div
                onClick={() =>
                  setSelected((prev) =>
                    prev.includes(stream.name)
                      ? prev.filter((name) => name !== stream.name)
                      : [...prev, stream.name]
                  )
                }
                key={stream.name}
              >
                <Card className="group relative border-2 border-zinc-600 rounded-3xl bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-95 overflow-hidden">
                  <div
                    className={cn(
                      "opacity-0 bg-black absolute inset-0 z-10 duration-100",
                      selected.includes(stream.name) && "opacity-50"
                    )}
                  />

                  <div
                    className={cn(
                      "opacity-0 absolute right-4 top-4 z-20 duration-100",
                      selected.includes(stream.name) && "delay-300 opacity-100"
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

                  {/* Overlay Content */}
                  <CardContent className="relative z-10 flex flex-col items-center justify-between h-90 text-center">
                    <div
                      className={cn(
                        "flex items-end gap-2 absolute top-0 delay-100",
                        selected.includes(stream.name) &&
                          "-translate-y-20 duration-300 delay-0"
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
                        "text-xl font-bold text-white tracking-wide absolute bottom-0 delay-100",
                        selected.includes(stream.name) &&
                          "translate-y-20 duration-300 delay-0"
                      )}
                    >
                      {stream.name}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter>
          {selected.length > 0 && (
            <Button
              onClick={() => onOpenChange(false)}
              className="w-fit bg-purple-700 mb-4 mr-12 hover:bg-purple-700/80"
            >
              Stake {selected.length} NFT(s)
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
