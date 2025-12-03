export interface Stream {
  name: string;
  backgroundImage: string;
  rarity: string;
  power: number;
  lockUntil?: string;
  amount?: number;
}

export const streams: Stream[] = [
  {
    name: "Moyaking #500",
    amount: 0.4,
    power: 200,
    backgroundImage:
      "https://ipfs-proxy.magiceden.dev/ipfs/bafybeiah6mxjkphhhnbtz6fbkoweewaak6i4qbrfaseftcumgsduodfjnm/1.png",
    rarity: "legendary",
    lockUntil: "2025-22-04",
  },
  {
    name: "Moyaking #400",
    amount: 0.3,
    power: 400,
    backgroundImage:
      "https://ipfs-proxy.magiceden.dev/ipfs/bafybeiah6mxjkphhhnbtz6fbkoweewaak6i4qbrfaseftcumgsduodfjnm/2.png", // thay bằng link thật
    rarity: "common",
  },
  {
    name: "Moyaking #332",
    amount: 0.2,
    power: 100,
    backgroundImage:
      "https://ipfs-proxy.magiceden.dev/ipfs/bafybeiah6mxjkphhhnbtz6fbkoweewaak6i4qbrfaseftcumgsduodfjnm/3.png",
    rarity: "uncommon",
  },
  {
    name: "Moyaking #210",
    amount: 0.998,
    power: 300,
    backgroundImage:
      "https://ipfs-proxy.magiceden.dev/ipfs/bafybeiah6mxjkphhhnbtz6fbkoweewaak6i4qbrfaseftcumgsduodfjnm/4.png",
    rarity: "rare",
  },
  {
    name: "Moyaking #322",
    amount: 0.39,
    power: 300,
    backgroundImage:
      "https://ipfs-proxy.magiceden.dev/ipfs/bafybeiah6mxjkphhhnbtz6fbkoweewaak6i4qbrfaseftcumgsduodfjnm/5.png",
    rarity: "superrare",
  },
];
