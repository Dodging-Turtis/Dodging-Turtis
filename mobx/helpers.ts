export const NET_ID = 80001;

export const RPC_URL =
  process.env.NEXT_PUBLIC_RPC_URL ??
  'https://rpc-endpoints.superfluid.dev/mumbai';

export enum Order {
  PRICE_ASC,
  PRICE_DSC,
  LATEST,
  OLDEST,
}

export async function fetchIpfs(url: string) {
  url = url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');
  const data = await fetch(url);
  return await data.json();
}

export function sortNfts(globalNfts: IMarketNft[], sortOrder: Order) {
  switch (sortOrder) {
    case Order.PRICE_ASC:
      return globalNfts.sort((a, b) => a.price - b.price);
    case Order.PRICE_DSC:
      return globalNfts.sort((a, b) => b.price - a.price);
    case Order.OLDEST:
      return globalNfts.sort((a, b) => b.tokenId - a.tokenId);
    default:
      return globalNfts.sort((a, b) => a.tokenId - b.tokenId);
  }
}
