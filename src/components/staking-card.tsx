import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Counter from "@/components/ui/Counter";
import { useMemo } from "react";
import { useConnection, useReadContract, useReadContracts } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/blockchain";
import { getRarity } from "@/lib/utils";
import { RarityStakingPower } from "@/constants/rarity";

export function StakingCard() {
  const { address } = useConnection();

  const { data: listNFTs } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getUserStakedNFTs",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const { data: stakeInfos } = useReadContracts({
    contracts: (listNFTs as bigint[])?.map((id) => ({
      abi: CONTRACT_ABI,
      address: CONTRACT_ADDRESS,
      functionName: "getStakeInfo",
      args: [id],
    })) as any,
    query: {
      enabled: !!listNFTs && (listNFTs as bigint[])?.length > 0,
    },
  });

  const stakePower = useMemo(() => {
    if (!listNFTs) return 0;
    else
      return (listNFTs as bigint[]).reduce((totalPower, id) => {
        const rarity = getRarity(id);

        if (rarity) {
          const power = RarityStakingPower[rarity];
          return totalPower + power;
        }

        return totalPower;
      }, 0);
  }, [listNFTs]);

  const countPlaces = useMemo(() => {
    return stakePower
      .toString()
      .split("")
      .map((_, index) => Math.pow(10, index))
      .reverse();
  }, [stakePower]);

  return (
    <Card className="bg-[#161b22] border-gray-800 rounded-3xl">
      <CardContent>
        <div className="flex gap-y-8 flex-col md:flex-row justify-between items-start">
          <div>
            <div className="text-left">
              <div className="text-4xl font-bold text-purple-500 inline-flex items-center gap-2">
                <Counter
                  fontSize={36}
                  value={stakePower}
                  places={countPlaces}
                  gap={1}
                  horizontalPadding={0}
                  textColor="oklch(62.7% 0.265 303.9)"
                  containerStyle={undefined}
                  counterStyle={undefined}
                  digitStyle={undefined}
                />
                %
              </div>
              <div className="flex items-center justify-start gap-1 text-gray-400 text-sm">
                <span>Total Stake Power</span>
                <Info className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="text-4xl font-bold text-white mb-1 inline-flex gap-7 mt-8">
              {(listNFTs as bigint[])?.length ?? 0}
            </div>
            <div className="text-gray-400 text-sm">Total Staked NFT</div>
          </div>

          <Button
            variant="outline"
            className="w-fit bg-white text-black hover:bg-gray-200 border-0 rounded-xl p-0 font-medium text-xs"
          >
            <a
              href="https://magiceden.io/collections/monad/Moyaking"
              target="_blank"
              className="h-full w-full mx-2 inline-flex items-center"
            >
              Buy More NFT(s)
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
