export enum Rarity {
  Legendary = "legendary",
  Common = "common",
  Uncommon = "uncommon",
  Rare = "rare",
  SuperRare = "superrare",
}

export const RarityColor = {
  [Rarity.Legendary]: "bg-red-500/20 text-red-500 border-red-500/50",
  [Rarity.Common]: "bg-gray-500/20 text-gray-500 border-gray-500/50",
  [Rarity.Uncommon]: "bg-emerald-500/20 text-emerald-500 border-emerald-500/50",
  [Rarity.Rare]: "bg-blue-500/20 text-blue-500 border-blue-500/50",
  [Rarity.SuperRare]: "bg-amber-500/20 text-amber-500 border-amber-500/50",
};
