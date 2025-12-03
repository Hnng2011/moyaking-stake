import { Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { streams } from "@/fake-data";
import { RarityColor } from "@/constants/rarity";

const modalVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.4, 1],
    opacity: [0.8, 0.4, 0.8],
    transition: { duration: 2, ease: "easeInOut", repeat: Infinity },
  },
};

const dotVariants = {
  animate: {
    scale: [1, 2.5, 1],
    opacity: [0.7, 0, 0.7],
    transition: { duration: 2, ease: "easeOut", repeat: Infinity },
  },
};

export function EcosystemStreams() {
  const [activeStream, setActiveStream] = useState<any | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleHoverStart = (stream: any) => {
    timerRef.current = setTimeout(() => setActiveStream(stream), 500);
  };

  const handleHoverEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="space-y-8 py-8">
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

      <AnimatePresence>
        {activeStream && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStream(null)}
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
                src={activeStream.backgroundImage}
                alt={activeStream.name}
                className="w-full h-full object-contain bg-black/20"
              />
              <button
                onClick={() => setActiveStream(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-3xl font-bold text-white">
                  {activeStream.name}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(!streams || streams.length === 0) && (
          <div className="min-h-64 flex items-center justify-center col-span-full text-zinc-400">
            There is no Staking NFT(s) yet
          </div>
        )}

        {streams.map((stream) => (
          <Card
            key={stream.name}
            className="p-0 group relative border-0 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={stream.backgroundImage}
                alt={stream.name}
                loading="lazy"
                className="w-full h-full object-cover brightness-[0.4] blur-sm group-hover:blur-md transition-all duration-500"
              />
            </div>

            <CardContent className="relative z-10 flex flex-col h-full min-h-[360px] p-6">
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "py-1 px-2.5 rounded-lg border text-[10px] font-bold tracking-wider",
                      RarityColor[stream.rarity as keyof typeof RarityColor]
                    )}
                  >
                    {stream.rarity.toUpperCase()}
                  </span>
                  <span
                    className={cn(
                      "py-1 px-2.5 rounded-lg border text-[10px] font-bold",
                      RarityColor[stream.rarity as keyof typeof RarityColor]
                    )}
                  >
                    {stream.power}%
                  </span>
                </div>
                <Info className="w-5 h-5 text-white/40 hover:text-white transition-colors cursor-help" />
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-6 my-4">
                <motion.div
                  className="relative w-32 h-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden cursor-pointer"
                  onHoverStart={() => handleHoverStart(stream)}
                  onHoverEnd={handleHoverEnd}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={stream.backgroundImage}
                    alt={stream.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white truncate max-w-[200px]">
                    {stream.name}
                  </h3>
                  <div className="inline-block bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1">
                    <span className="text-purple-200 font-bold text-sm">
                      {stream.amount} POINT
                    </span>
                  </div>
                </div>
              </div>

              <Button
                disabled={!!stream.lockUntil}
                className="w-full bg-white text-black hover:text-white  disabled:bg-zinc-900 disabled:text-zinc-400 font-semibold rounded-xl transition-all"
              >
                {stream.lockUntil ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="relative flex h-2 w-2"
                      variants={pulseVariants as any}
                      animate="animate"
                    >
                      <motion.span
                        className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"
                        variants={dotVariants as any}
                        animate="animate"
                      />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </motion.div>
                    <span className="text-xs">
                      Locked until {stream.lockUntil}
                    </span>
                  </div>
                ) : (
                  "Claim Points"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
