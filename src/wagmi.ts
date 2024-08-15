'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { NEXT_PUBLIC_WC_PROJECT_ID } from './config';
import { BASE_SEPOLIA_RPC_URL, BASE_SEPOLIA_CHAIN_ID } from './constants'; 

export function useWamigConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? '';
  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: 'Recommended Wallet',
          wallets: [coinbaseWallet],
        },
        {
          groupName: 'Other Wallets',
          wallets: [rainbowWallet, metaMaskWallet],
        },
      ],
      {
        appName: 'onchainkit',
        projectId,
      },
    );

    const wagmiConfig = createConfig({
      chains: [baseSepolia],
      connectors,
      ssr: true,
      transports: {
        [BASE_SEPOLIA_CHAIN_ID]: http(BASE_SEPOLIA_RPC_URL), // Upewnij się, że używasz poprawnego Chain ID i URL RPC
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
