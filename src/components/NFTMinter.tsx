import React from 'react';
import { uploadToIPFS } from '../ipfs';
import html2canvas from 'html2canvas';
import { useAddress } from '@thirdweb-dev/react';

const NFTMinter = () => {
  const userWalletAddress = useAddress();

  const generateImage = async () => {
    const element = document.getElementById('quote-container');
    if (!element) {
      throw new Error("Element not found");
    }
    return html2canvas(element).then(canvas => canvas.toDataURL('image/png'));
  };
  const mintNFT = async (address: string, imageUrl: string) => {
    // Implementacja mintowania NFT tutaj
  };

  const handleMint = async () => {
    try {
      if (!userWalletAddress) {
        alert("Please connect your wallet before minting.");
        return;
      }
  
      const imageData = await generateImage();
      const ipfsUrl = await uploadToIPFS(imageData);
      await mintNFT(userWalletAddress, ipfsUrl);
      alert("NFT successfully minted!");
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Minting failed!");
    }
  };
  

  return (
    <button onClick={handleMint}>Mint NFT</button>
  );
};

export default NFTMinter;
