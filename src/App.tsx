import { MOYAKINGDashboard } from "@/components/moyaking-dashboard";
import "./App.css";
import { AppKitProvider } from "@reown/appkit/react";
import { monad, monadTestnet } from "viem/chains";
import Noise from "./components/ui/noise";

export default function Home() {
  return (
    <AppKitProvider
      projectId="4f84896bb7ba136afd67f50f6ad221ca"
      networks={[monad, monadTestnet]}
    >
      <Noise />
      <MOYAKINGDashboard />
    </AppKitProvider>
  );
}
