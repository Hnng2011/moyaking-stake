import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "@wagmi/core";
import { monad, monadTestnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const projectId = "4f84896bb7ba136afd67f50f6ad221ca";

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: false,
  projectId,
  networks: [monad, monadTestnet],
});

const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://example.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const queryClient = new QueryClient();

createAppKit({
  adapters: [wagmiAdapter],
  networks: [monad, monadTestnet],
  projectId,
  metadata,
});

export function AppKitProvider({ children }: { children: any }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
