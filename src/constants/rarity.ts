export enum Rarity {
  Legendary = "legendary",
  Common = "common",
  Uncommon = "uncommon",
  Rare = "rare",
  SuperRare = "superrare",
}

export const MonthStakingPower = {
  1: 10,
  3: 50,
  6: 100,
  12: 200,
};

export const MonthLabel = {
  1: "1 Month",
  3: "3 Months",
  6: "6 Months",
  12: "12 Months",
};

export const RarityStakingPower = {
  [Rarity.Legendary]: 400,
  [Rarity.Common]: 30,
  [Rarity.Uncommon]: 50,
  [Rarity.Rare]: 100,
  [Rarity.SuperRare]: 200,
};

export const RarityLabel = {
  [Rarity.Legendary]: "Legendary",
  [Rarity.Common]: "Common",
  [Rarity.Uncommon]: "Uncommon",
  [Rarity.Rare]: "Rare",
  [Rarity.SuperRare]: "Super Rare",
};

export const RarityColor = {
  [Rarity.Legendary]: "bg-red-500/20 text-red-500 border-red-500/50",
  [Rarity.Common]: "bg-gray-500/20 text-gray-500 border-gray-500/50",
  [Rarity.Uncommon]: "bg-emerald-500/20 text-emerald-500 border-emerald-500/50",
  [Rarity.Rare]: "bg-blue-500/20 text-blue-500 border-blue-500/50",
  [Rarity.SuperRare]: "bg-amber-500/20 text-amber-500 border-amber-500/50",
};

export const RarityColorInfo = {
  [Rarity.Legendary]:
    "bg-linear-to-br from-red-800/60 to-red-400/20 text-red-500 border-red-500/50",
  [Rarity.Common]:
    "bg-linear-to-br from-gray-500/80 to-gray-800/80 border-gray-500/50",
  [Rarity.Uncommon]:
    "bg-linear-to-br from-emerald-600/20 to-emerald-800/80 text-emerald-500 border-emerald-500/50",
  [Rarity.Rare]:
    "bg-linear-to-br from-blue-500/20 to-blue-800/80 text-blue-500 border-blue-500/50",
  [Rarity.SuperRare]:
    "bg-linear-to-br from-amber-400/20 to-amber-800/80 text-amber-500 border-amber-500/50",
};
