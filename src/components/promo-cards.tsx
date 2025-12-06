import { Card, CardContent } from "@/components/ui/card";
import { NFTStakeModal } from "./nft-stake-modal";
import { streams } from "@/fake-data";
import { useMemo, useState } from "react";
import Counter from "./ui/Counter";
import { useConnection, useReadContract, useReadContracts } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/blockchain";

export function PromoCards() {
  const [openModal, setOpenModal] = useState(false);

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

  const totalPoint: number = useMemo(() => {
    return (
      stakeInfos?.reduce(
        (total, res) => total + Number((res.result as any[])?.[5] ?? 0),
        0
      ) ?? 0
    );
  }, [stakeInfos]);

  const countPlaces = useMemo(() => {
    return totalPoint
      .toString()
      .split("")
      .map((_, index) => Math.pow(10, index))
      .reverse();
  }, [totalPoint]);

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <Card className="bg-linear-to-br from-emerald-900 to-cyan-700 border-0 rounded-2xl overflow-hidden">
        <CardContent className="h-full flex flex-col gap-4 relative group">
          <h3 className="text-white font-bold leading-tight text-2xl z-10">
            All Stake Point
          </h3>
          <p className="text-xs text-gray-300">
            Staking more NFT(s) to get more point!
          </p>

          <p className="text-gray-300 relative z-10 inline-flex gap-2">
            <Counter
              fontSize={24}
              value={totalPoint}
              places={countPlaces}
              gap={1}
              horizontalPadding={0}
              textColor="oklch(62.7% 0.265 303.9)"
              containerStyle={undefined}
              counterStyle={undefined}
              digitStyle={undefined}
            />{" "}
            POINT
          </p>
        </CardContent>
      </Card>

      <Card className="bg-linear-to-br from-purple-600 to-blue-600 border-0 rounded-2xl overflow-hidden">
        <CardContent className="h-full flex flex-col gap-4 group">
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
