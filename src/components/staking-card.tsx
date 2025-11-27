import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Counter from "@/components/ui/Counter";
import { useMemo } from "react";
export function StakingCard() {
  const stakePower = 1100;
  const stakeMon = 1200;

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
            <div className="text-4xl font-bold text-purple-500 inline-flex gap-4 items-center">
              <Counter
                fontSize={36}
                horizontalPadding={0}
                value={stakePower}
                places={countPlaces}
                gap={1}
                textColor="oklch(62.7% 0.265 303.9)"
                containerStyle={undefined}
                counterStyle={undefined}
                digitStyle={undefined}
              />{" "}
              MON
            </div>
            <div className="text-gray-400 text-sm">Total Staked Balance</div>

            <div className="text-4xl font-bold text-white mb-1 inline-flex gap-7 mt-8">
              4{" "}
              <Button
                variant="outline"
                className="flex-1 bg-white text-black hover:bg-gray-200 border-0 rounded-xl p-0 font-medium text-xs"
              >
                <a
                  href="https://magiceden.io/collections/monad/Moyaking"
                  target="_blank"
                  className="h-full w-full mx-2 inline-flex items-center"
                >
                  Buy More
                </a>
              </Button>
            </div>
            <div className="text-gray-400 text-sm">Total Staked NFT</div>
          </div>

          <div className="text-right">
            <div className="text-4xl font-bold text-purple-500 inline-flex items-center gap-4">
              <Counter
                fontSize={36}
                value={stakeMon}
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
            <div className="flex items-center justify-start md:justify-end gap-1 text-gray-400 text-sm">
              <span>Total Stake Power</span>
              <Info className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
