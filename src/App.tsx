import { MOYAKINGDashboard } from "@/components/moyaking-dashboard";
import "./App.css";
import Noise from "./components/ui/noise";
import { AppKitProvider } from "./provider";
import { Toaster } from "./components/ui/sonner";

export default function Home() {
  return (
    <AppKitProvider>
      <Noise />
      <MOYAKINGDashboard />
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            success: "bg-green-400 text-whiet border-green-500",
            error: "bg-red-600 text-white border-red-700",
            loading: "bg-sky-400 text-black border-sky-700",
          },
        }}
      />
    </AppKitProvider>
  );
}
