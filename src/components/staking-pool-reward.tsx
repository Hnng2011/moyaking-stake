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
          <h2 className="text-2xl text-purple-500 font-semibold text-center">
            NFT Rewards
          </h2>

          <div className="grid grid-cols-3 mt-8 place-items-center gap-8 bg-linear-to-br from-emerald-900 to-cyan-700 py-8 rounded-4xl">
            <div className="bg-red-500 w-24 h-24 rounded-full">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full col-start-3">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full col-start-2">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full col-start-1">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full col-start-3">
              <img></img>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-2xl text-purple-500 font-semibold  text-center">
            Token Rewards
          </h2>

          <div className="grid grid-cols-3 mt-8 place-items-center gap-8 py-8 rounded-4xl bg-linear-to-br from-purple-600/40 to-blue-600/40">
            <div className="bg-red-500 w-24 h-24 rounded-full">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full">
              <img></img>
            </div>
            <div className="bg-red-500 w-24 h-24 rounded-full">
              <img></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
