// Ustawienia dla sieci Base Sepolia
export const BASE_SEPOLIA_RPC_URL = `https://api.developer.coinbase.com/rpc/v1/base-sepolia/${process.env.NEXT_PUBLIC_THIRDWEB_API_KEY}`;
export const BASE_SEPOLIA_CHAIN_ID = 84532; // Ensure this matches the correct chain ID

// Adresy i dane kontraktu
export const collectionAddress = '0x7d2F5CE0A91ceDce6135bBD1Bb758977582075d7';
export const comment = 'testing';
export const mintContractAddress = '0x7d2F5CE0A91ceDce6135bBD1Bb758977582075d7';
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
