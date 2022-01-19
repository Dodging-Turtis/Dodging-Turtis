interface Window {
  ethereum: any;
}

interface IUserNft {
  tokenId: number;
  tokenUri: string;
}

interface IMarketNft {
  itemId: number;
  tokenId: number;
  tokenUri: string;
  owner: string;
  seller: string;
  sold: boolean;
  price: number;
}

interface IMetadata {
  name: string;
  description: string;
  componentIndices: object;
  attributes: object;
  image: string;
}

interface IUserNftWithMetadata extends IUserNft {
  metadata: IMetadata;
}

interface IMarketNftWithMetadata extends IMarketNft {
  metadata: IMetadata;
}
