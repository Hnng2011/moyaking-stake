export function StakingPoolRewards() {
  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Staking Pool Rewards
          </h2>
          <p className="text-gray-400 text-sm mt-1">All kinds of Rewards</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="w-full">
          <h2 className="text-xl text-purple-500 font-semibold text-center">
            NFT Rewards
          </h2>

          <div className="grid grid-cols-3 mt-8 place-items-center gap-8 bg-linear-to-br from-emerald-900 to-cyan-700 py-8 rounded-4xl">
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full">
              <img src="/1.svg" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full col-start-3">
              <img src="/2.svg" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full col-start-2">
              <img src="/3.svg" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full col-start-1">
              <img src="/4.svg" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full col-start-3">
              <img src="/5.svg" />
            </div>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-xl text-purple-500 font-semibold  text-center">
            Token Rewards
          </h2>

          <div className="grid grid-cols-3 mt-8 place-items-center gap-8 py-8 rounded-4xl bg-linear-to-br from-purple-600/40 to-blue-600/40">
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full">
              <img src="/6.jpg" className="object-fill" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full">
              <img src="/7.jpg" className="object-fill" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full">
              <img src="/8.jpg" className="object-fill" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full">
              <img src="/9.jpg" className="object-fill" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full">
              <img src="/10.svg" className="object-fill" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full">
              <img src="/11.svg" className="object-fill" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full">
              <img src="/12.svg" className="object-fill" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full">
              <img src="/13.svg" className="object-fill" />
            </div>
            <div className="overflow-hidden border-2 border-purple-700 w-24 h-24 rounded-full">
              <img src="/14.svg" className="object-fill" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
