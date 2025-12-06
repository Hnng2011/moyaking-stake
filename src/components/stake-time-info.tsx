import { MonthLabel, MonthStakingPower } from "@/constants/rarity";

export function StakeTimeInfo() {
  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Staking Period and Staking Power
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Check your NFT Staking Power base on staking time
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

        <div
          className={
            "p-2 rounded-lg bg-linear-to-br from-25% to-purple-800/60 to-75% from-purple-400/10"
          }
        >
          <div className="flex justify-between px-8 lg:px-[10%]">
            <div className="w-50 flex items-center justify-center">
              <h2>{MonthLabel[4]}</h2>
            </div>
            <div className="w-50 flex items-center justify-center">
              <p>{MonthStakingPower[4]}%</p>
            </div>
          </div>
        </div>
        <div
          className={
            "p-2 rounded-lg bg-linear-to-br from-25% to-purple-800/60 to-75% from-purple-400/10 opacity-90"
          }
        >
          <div className="flex justify-between px-8 lg:px-[10%]">
            <div className="w-50 flex items-center justify-center">
              <h2>{MonthLabel[2]}</h2>
            </div>
            <div className="w-50 flex items-center justify-center">
              <p>{MonthStakingPower[2]}%</p>
            </div>
          </div>
        </div>
        <div
          className={
            "p-2 rounded-lg bg-linear-to-br from-25% to-purple-800/60 to-75% from-purple-400/10 opacity-70"
          }
        >
          <div className="flex justify-between px-8 lg:px-[10%]">
            <div className="w-50 flex items-center justify-center">
              <h2>{MonthLabel[1]}</h2>
            </div>
            <div className="w-50 flex items-center justify-center">
              <p>{MonthStakingPower[1]}%</p>
            </div>
          </div>
        </div>
        <div
          className={
            "p-2 rounded-lg bg-linear-to-br from-25% to-purple-800/60 to-75% from-purple-400/10 opacity-50"
          }
        >
          <div className="flex justify-between px-8 lg:px-[10%]">
            <div className="w-50 flex items-center justify-center">
              <h2>{MonthLabel[0]}</h2>
            </div>
            <div className="w-50 flex items-center justify-center">
              <p>{MonthStakingPower[0]}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
