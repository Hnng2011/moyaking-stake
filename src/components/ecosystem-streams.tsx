import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

enum Rarity {
  Legendary = "legendary",
  Common = "common",
  Uncommon = "uncommon",
  Rare = "rare",
  SuperRare = "superrare",
}

const RarityColor = {
  [Rarity.Legendary]: "bg-red-500/20 text-red-500 border-red-500/50",
  [Rarity.Common]: "bg-gray-500/20 text-gray-500 border-gray-500/50",
  [Rarity.Uncommon]: "bg-emerald-500/20 text-emerald-500 border-emerald-500/50",
  [Rarity.Rare]: "bg-blue-500/20 text-blue-500 border-blue-500/50",
  [Rarity.SuperRare]: "bg-amber-500/20 text-amber-500 border-amber-500/50",
};

const streams = [
  {
    name: "Moyaking #500",
    amount: "400",
    backgroundImage:
      "https://ipfs-proxy.magiceden.dev/ipfs/bafybeiah6mxjkphhhnbtz6fbkoweewaak6i4qbrfaseftcumgsduodfjnm/1.png",
    rarity: "legendary",
    lockUntil: "2025-22-04",
  },
  {
    name: "Moyaking #400",
    amount: "200",

    backgroundImage:
      "https://ipfs-proxy.magiceden.dev/ipfs/bafybeiah6mxjkphhhnbtz6fbkoweewaak6i4qbrfaseftcumgsduodfjnm/2.png", // thay bằng link thật
    rarity: "common",
  },
  {
    name: "Moyaking #332",
    amount: "200",

    backgroundImage:
      "https://ipfs-proxy.magiceden.dev/ipfs/bafybeiah6mxjkphhhnbtz6fbkoweewaak6i4qbrfaseftcumgsduodfjnm/3.png",
    rarity: "uncommon",
  },
  {
    name: "Moyaking #210",
    amount: "100",

    backgroundImage:
      "https://ipfs-proxy.magiceden.dev/ipfs/bafybeiah6mxjkphhhnbtz6fbkoweewaak6i4qbrfaseftcumgsduodfjnm/4.png",
    rarity: "rare",
  },
  {
    name: "Moyaking #322",
    amount: "100",
    backgroundImage:
      "https://ipfs-proxy.magiceden.dev/ipfs/bafybeiah6mxjkphhhnbtz6fbkoweewaak6i4qbrfaseftcumgsduodfjnm/5.png",
    rarity: "superrare",
  },
  // Thêm bao nhiêu cũng được, chỉ cần có backgroundImage
];

export function EcosystemStreams() {
  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/5">
        <div>
          <h2 className="text-2xl font-bold text-white">Staking Zone</h2>
          <p className="text-gray-400 text-sm mt-1">
            Earn rewards by staking MOYAKING
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-8 font-medium">
          Claim all
        </Button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {streams.map((stream) => (
          <Card
            key={stream.name}
            className="group relative border-0 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/20"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={stream.backgroundImage}
                alt={stream.name}
                className="w-full h-full object-cover brightness-50 blur-sm transition-all duration-500"
              />
            </div>

            {/* Overlay Content */}
            <CardContent className="relative z-10 flex flex-col items-center justify-between h-80 text-center">
              {/* Top: Info Icon */}
              <div className="flex justify-between w-full items-center">
                <div
                  className={cn(
                    "py-1 px-3 rounded-lg border text-xs",
                    RarityColor[stream.rarity as keyof typeof RarityColor]
                  )}
                >
                  {stream.rarity.toUpperCase()}
                </div>
                <div className="cursor-pointer">
                  <Info className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                {/* Project Icon */}
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-xl overflow-hidden">
                  <img
                    src={stream.backgroundImage}
                    alt={stream.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {stream.name}
                </h3>

                <div className="bg-purple-500/20 border border-purple-400/50 backdrop-blur-md rounded-full px-3 py-1">
                  <span className="text-purple-300 font-bold text-lg">
                    {stream.amount}%
                  </span>
                </div>
              </div>

              <Button
                disabled={!!stream.lockUntil}
                className="w-full disabled:bg-black disabled:text-white mt-6 bg-white text-black hover:text-white font-semibold rounded-xl transition-all duration-300"
              >
                {!!stream.lockUntil && (
                  <motion.span
                    className="relative flex h-2 w-2 mr-2"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.8, 0.4, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"
                      animate={{
                        scale: [1, 2.5, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeOut",
                        repeat: Infinity,
                      }}
                    />

                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </motion.span>
                )}

                {!!stream.lockUntil
                  ? `Locked until ${stream.lockUntil}`
                  : "Claim Rewards"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
