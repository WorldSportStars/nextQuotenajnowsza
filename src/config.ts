// Base URL based on the environment
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://onchain-app-template.vercel.app';

// API Key from the Coinbase Developer Portal
export const NEXT_PUBLIC_CDP_API_KEY = process.env.NEXT_PUBLIC_CDP_API_KEY;
if (!NEXT_PUBLIC_CDP_API_KEY) {
  console.warn('Warning: NEXT_PUBLIC_CDP_API_KEY is not set. API calls may fail.');
}

// WalletConnect Project ID
export const NEXT_PUBLIC_WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
if (!NEXT_PUBLIC_WC_PROJECT_ID) {
  console.warn('Warning: NEXT_PUBLIC_WC_PROJECT_ID is not set. Wallet connections may fail.');
}

// Thirdweb API Key
export const NEXT_PUBLIC_THIRDWEB_API_KEY = process.env.NEXT_PUBLIC_THIRDWEB_API_KEY || process.env.THIRDWEB_API_KEY;
if (!NEXT_PUBLIC_THIRDWEB_API_KEY) {
  console.warn('Warning: NEXT_PUBLIC_THIRDWEB_API_KEY is not set. Thirdweb integration may fail.');
}

// Additional checks for the environment configuration
if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode.');
} else if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode.');
} else {
  console.warn('Warning: Unrecognized NODE_ENV value. Make sure it is either "development" or "production".');
}
