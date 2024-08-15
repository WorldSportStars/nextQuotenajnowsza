import { ThirdwebStorage } from '@thirdweb-dev/storage';

const storage = new ThirdwebStorage({
  clientId: "8e75832a33553f451561b98b80c3f9a6",
});

export async function uploadToIPFS(imageData: string) {
  const ipfsUrl = await storage.upload({
    data: imageData,
    name: "Generated Image",
    description: "Snapshot of background and quote",
  });
  return ipfsUrl;
}
