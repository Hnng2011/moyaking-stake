import {
  Rarity,
  RarityColor,
  RarityLabel,
  RarityStakingPower,
} from "@/constants/rarity";
import { cn } from "@/lib/utils";

export function RarityInfo() {
  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Rarities and Staking Power
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Check your NFT Staking Power base on it rarity
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between px-8 lg:px-[10%]">
          <div className="w-50 flex items-center justify-center">
            <h2 className="text-xl font-semibold">Rarity</h2>
          </div>
          <div className="w-50 flex items-center justify-center">
            <p className="text-xl font-semibold">Staking Power</p>
          </div>
        </div>

        <div className={cn(RarityColor[Rarity.Legendary], "p-2 rounded")}>
          <div className="flex justify-between px-8 lg:px-[10%]">
            <div className="w-50 flex items-center justify-center">
              <h2>{RarityLabel[Rarity.Legendary]}</h2>
            </div>
            <div className="w-50 flex items-center justify-center">
              <p>{RarityStakingPower[Rarity.Legendary]}%</p>
            </div>
          </div>
        </div>
        <div className={cn(RarityColor[Rarity.SuperRare], "p-2 rounded")}>
          <div className="flex justify-between px-8 lg:px-[10%]">
            <div className="w-50 flex items-center justify-center">
              <h2>{RarityLabel[Rarity.SuperRare]}</h2>
            </div>
            <div className="w-50 flex items-center justify-center">
              <p>{RarityStakingPower[Rarity.SuperRare]}%</p>
            </div>
          </div>
        </div>
        <div className={cn(RarityColor[Rarity.Rare], "p-2 rounded")}>
          <div className="flex justify-between px-8 lg:px-[10%]">
            <div className="w-50 flex items-center justify-center">
              <h2>{RarityLabel[Rarity.Rare]}</h2>
            </div>
            <div className="w-50 flex items-center justify-center">
              <p>{RarityStakingPower[Rarity.Rare]}%</p>
            </div>
          </div>
        </div>
        <div className={cn(RarityColor[Rarity.Uncommon], "p-2 rounded")}>
          <div className="flex justify-between px-8 lg:px-[10%]">
            <div className="w-50 flex items-center justify-center">
              <h2>{RarityLabel[Rarity.Uncommon]}</h2>
            </div>
            <div className="w-50 flex items-center justify-center">
              <p>{RarityStakingPower[Rarity.Uncommon]}%</p>
            </div>
          </div>
        </div>
        <div className={cn(RarityColor[Rarity.Common], "p-2 rounded")}>
          <div className="flex justify-between px-8 lg:px-[10%]">
            <div className="w-50 flex items-center justify-center">
              <h2>{RarityLabel[Rarity.Common]}</h2>
            </div>
            <div className="w-50 flex items-center justify-center">
              <p>{RarityStakingPower[Rarity.Common]}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
