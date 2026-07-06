'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { celo } from 'wagmi/chains';
import { ReactNode, useState } from 'react';

// إعداد التكوين الافتراضي لشبكة Celo بدون autoConnect لتفادي أخطاء التحميل
export const config = createConfig({
  chains: [celo],
  transports: {
    [celo.id]: http(),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}