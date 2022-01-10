interface Window {
  ethereum: any;
}

interface INft {
  price: number;
  owner: string;
  seller: string;
  tokenId: number;
}

interface IMetadata {
  name: string;
  attributes: object;
}
