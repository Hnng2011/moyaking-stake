import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { monad, monadTestnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const projectId = "4f84896bb7ba136afd67f50f6ad221ca";

export const wagmiAdapter = new WagmiAdapter({
  ssr: false,
  projectId,
  networks: [monad, monadTestnet],
});

const queryClient = new QueryClient();

createAppKit({
  adapters: [wagmiAdapter],
  networks: [monad, monadTestnet],
  projectId,
});

export function AppKitProvider({ children }: { children: any }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
