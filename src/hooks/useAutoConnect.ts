'use client';

import { useEffect } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { injected } from 'wagmi/connectors';

// إخبار TypeScript بوجود كائن ethereum المحقون من المحافظ
declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useAutoConnect() {
  const { connect } = useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    // الاتصال الصامت: يطلب الحسابات بدون إطلاق نافذة المصادقة المزعجة أولاً
    if (!isConnected && typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            connect({ connector: injected() });
          }
        })
        .catch(console.error);
    }
  }, [isConnected, connect]);
}