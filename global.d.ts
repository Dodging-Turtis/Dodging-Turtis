interface Window {
  ethereum: any;
}

interface INft {
  tokenId: number;
  tokenUri: string;
}

interface IMarketItem {
  itemId: number;
  tokenId: number;
  owner: string;
  price: number;
}

interface IMetadata {
  tokenId: number;
  name: string;
  description: string;
  componentIndices: object;
  attributes: object;
  image: string;
}
