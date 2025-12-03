import { Rarity } from "@/constants/rarity";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseIpfsUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
};

export const fetchMetadata = async (ipfsUrl: string) => {
  try {
    const httpUrl = parseIpfsUrl(ipfsUrl);
    const response = await fetch(httpUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch IPFS:", error);
    return null;
  }
};

export function getRarity(tokenId: bigint): Rarity | null {
  // Legend (1-38)
  if (tokenId >= 1n && tokenId <= 38n) {
    return Rarity.Legendary;
  }

  // SuperRare (39-138)
  if (tokenId >= 39n && tokenId <= 138n) {
    return Rarity.SuperRare;
  }

  // Rare (139-388)
  if (tokenId >= 139n && tokenId <= 388n) {
    return Rarity.Rare;
  }

  // Common (389-888)
  if (tokenId >= 389n && tokenId <= 888n) {
    return Rarity.Common;
  }

  // Uncommon (889-1888)
  if (tokenId >= 889n && tokenId <= 1888n) {
    return Rarity.Uncommon;
  }

  return null;
}
