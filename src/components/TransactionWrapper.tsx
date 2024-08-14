'use client';
import { useState } from 'react';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import type { Address, ContractFunctionParameters } from 'viem';
import { parseEther } from 'viem';
import {
  BASE_SEPOLIA_CHAIN_ID,
  collectionAddress,
  comment,
  mintABI,
  mintContractAddress,
  mintReferral,
  quantity,
  tokenId,
} from '../constants';

type TransactionWrapperParams = {
  address: Address;
  imageURI: string; 
};

export default function TransactionWrapper({
  address,
  imageURI,
}: TransactionWrapperParams) {

  const mintTo = address;

  const contracts = [
    {
      address: mintContractAddress,
      abi: mintABI,
      functionName: 'mint',
      args: [
        mintTo,
        BigInt(quantity),
        collectionAddress,
        BigInt(tokenId),
        mintReferral,
        comment,
      ],
      value: parseEther('0'), // Set to 0 to avoid fees for testing
      gasLimit: 21000, // Set a default gas limit
      gasPrice: parseEther('0.0000001'), // Set a default gas price
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
  };

  return (
    <div className="flex w-[450px]">
      <Transaction
        address={address}
        contracts={contracts}
        className="w-[450px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton
          className="mt-0 mr-2 ml-auto w-[220px] max-w-full text-[white]"
          text="Collect"
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
