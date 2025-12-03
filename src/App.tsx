import { MOYAKINGDashboard } from "@/components/moyaking-dashboard";
import "./App.css";
import Noise from "./components/ui/noise";
import { AppKitProvider } from "./provider";

export default function Home() {
  return (
    <AppKitProvider>
      <Noise />
      <MOYAKINGDashboard />
    </AppKitProvider>
  );
}
