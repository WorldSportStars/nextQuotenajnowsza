// Ustawienia dla sieci Base Sepolia z Coinbase
export const BASE_SEPOLIA_RPC_URL = `https://api.developer.coinbase.com/rpc/v1/base-sepolia/${process.env.NEXT_PUBLIC_CDP_API_KEY}`;
export const BASE_SEPOLIA_CHAIN_ID = 84532; // Chain ID dla Base Sepolia

// Adresy i dane kontraktu
export const collectionAddress = '0x120A8Ccbd292934E87A7803a66e9C1982C89D549';
export const comment = 'testing';
export const mintContractAddress = '0x120A8Ccbd292934E87A7803a66e9C1982C89D549';
export const mintReferral = '0x0000000000000000000000000000000000000000';
export const quantity = '1';
export const tokenId = '1';

// ABI kontraktu
export const mintABI = [
  {
    inputs: [
      { internalType: 'address', name: 'mintTo', type: 'address' },
      { internalType: 'uint256', name: 'quantity', type: 'uint256' },
      { internalType: 'address', name: 'collection', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'address', name: 'mintReferral', type: 'address' },
      { internalType: 'string', name: 'comment', type: 'string' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;
