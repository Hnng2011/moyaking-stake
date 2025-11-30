import { Header } from "./header";
import { StakingCard } from "./staking-card";
import { PromoCards } from "./promo-cards";
import { EcosystemStreams } from "./ecosystem-streams";
import { StakingPoolRewards } from "./staking-pool-reward";
import { RarityInfo } from "./rarity-info";

export function MOYAKINGDashboard() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Header />
      <main className="container mx-auto py-4 bg-[#0d1117] z-20 mt-8 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-full">
            <StakingCard />
          </div>
          <div className="flex flex-col gap-4">
            <PromoCards />
          </div>
        </div>
      </main>

      <div className="container mx-auto px-8">
        <EcosystemStreams />
      </div>

      <div className="container mx-auto px-8">
        <StakingPoolRewards />
      </div>

      <div className="container mx-auto px-8">
        <RarityInfo />
      </div>
    </div>
  );
}
