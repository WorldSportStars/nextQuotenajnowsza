'use client';
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
  mintABI,
  mintContractAddress,
  collectionAddress,
  mintReferral,
  quantity,
  tokenId,
  comment,
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
      value: parseEther('0.001'), // Koszt mintowania 0.001 ETH
      // Usunięcie gasLimit i gasPrice, aby pozwolić sieci na oszacowanie
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
