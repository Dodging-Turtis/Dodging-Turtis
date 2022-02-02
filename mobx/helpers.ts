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
  const metadata: IMetadata = await data.json();
  metadata.image = metadata.image.replace(
    'ipfs://',
    'https://cloudflare-ipfs.com/ipfs/'
  );
  return metadata;
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

export const dummyTurtle = {
  tokenId: 1,
  tokenUri:
    'ipfs://bafyreicjwky6t2dcdqpj6r6lx2tl2rgdo5riazknoq4yzgyvkrhyuxyqfm/metadata.json',
  metadata: {
    name: 'Floppy Turtle',
    description: 'A Turtle that is on a journey in the river',
    componentIndices: {
      eyes: '8',
      hands: '9',
      head: '6',
      legs: '10',
      shell: '6',
      shellOuter: 'NaN',
      tail: 'NaN',
    },
    attributes: [
      {
        trait_type: 'speed',
        value: 106,
      },
    ],
    image:
      'https://cloudflare-ipfs.com/ipfs/bafybeihjzfdlnzw7xfpc33o3cf7tunqcyj6ithepao3apdzykj4gvvug5y/randomTurtle.png',
  },
};
