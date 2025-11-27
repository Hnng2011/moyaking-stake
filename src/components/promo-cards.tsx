import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { NFTStakeModal } from "./nft-stake-modal";
import { streams } from "@/fake-data";
import { useState } from "react";

export function PromoCards() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <Card className="bg-linear-to-br from-emerald-600 to-cyan-600 border-0 rounded-2xl overflow-hidden">
        <CardContent className="h-full flex flex-col justify-between relative group">
          <h3 className="text-white font-bold leading-tight text-2xl z-10">
            Airdrop MON
          </h3>
          <p className="text-xs text-gray-300 relative z-10">
            Top the leaderboard & secure your MON airdrop!
          </p>
          <Button className="text-white/90 text-lg w-fit z-10 lg:translate-y-16 lg:group-hover:translate-y-0">
            Claim
          </Button>
          <motion.div
            className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-400/40 rounded-full blur"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute right-2 top-2 w-8 h-8 bg-emerald-400/50 rounded-lg blur"
            animate={{
              rotate: [12, 30, 12],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute left-10 top-20 w-16 h-16 bg-cyan-400/50 rounded-2xl blur"
            animate={{
              y: [0, -40, 0],
              x: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="absolute -left-6 bottom-10 w-24 h-24 bg-purple-500/50 rounded-full blur"
            animate={{
              scale: [1, 1.4, 1],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute right-20 bottom-32 w-12 h-12 bg-emerald-300 rounded-xl blur rotate-45"
            animate={{
              x: [0, 40, 40, 0],
              y: [0, -20, 0],
              rotate: [45, 90, 45],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </CardContent>
      </Card>

      <Card className="bg-linear-to-br from-purple-600 to-blue-600 border-0 rounded-2xl overflow-hidden">
        <CardContent className="h-full flex flex-col justify-between group">
          <div>
            <h3 className="text-white font-bold text-2xl leading-tight">
              Staking NFTs
            </h3>
          </div>
          <p className="text-xs text-gray-300">
            Staking to earn reward right today!
          </p>

          <NFTStakeModal
            open={openModal}
            streams={streams}
            onOpenChange={setOpenModal}
          />
        </CardContent>
      </Card>
    </div>
  );
}
