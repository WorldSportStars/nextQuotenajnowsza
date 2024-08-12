import React from 'react';
import { Button, TextField } from '@mui/material';

interface NFTMinterProps {
  quote: string;
  bgColor: string;
  font: string;
  effect: string;
  price: number;
  onMint: () => void;
}

const NFTMinter: React.FC<NFTMinterProps> = ({ quote, bgColor, font, effect, price, onMint }) => {
  const handleMint = () => {
    // Tu powinna znajdować się logika mintowania na blockchainie
    onMint();
  };

  return (
    <div>
      <TextField
        variant="filled"
        fullWidth
        label="NFT Title"
        style={{ margin: '10px 0' }}
      />
      <TextField
        variant="filled"
        fullWidth
        label="NFT Description"
        multiline
        rows={3}
        style={{ margin: '10px 0' }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleMint}
        style={{ margin: '10px 0' }}
      >
        Mint NFT ({price} ETH)
      </Button>
    </div>
  );
};

export default NFTMinter;
