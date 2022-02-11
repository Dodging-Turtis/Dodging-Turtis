import {
  NOTIFICATION_TYPE,
  Store as NotificationStore,
} from 'react-notifications-component';

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

export function notify(type: NOTIFICATION_TYPE, data: string) {
  NotificationStore.addNotification({
    title: type === 'danger' ? 'Error' : 'Success',
    message: data,
    type: type,
    insert: 'top',
    container: 'top-right',
    dismiss: {
      duration: 800,
      pauseOnHover: true,
      onScreen: true,
      showIcon: true,
    },
    animationIn: ['animate__animated animate__fadeIn'], // `animate.css v4` classes
    animationOut: ['animate__animated animate__fadeOut'],
  });
}

export async function fetchIpfs(url: string) {
  url = url.replace('ipfs://', 'https://opensea.mypinata.cloud/ipfs/');
  const data = await fetch(url);
  const metadata: IMetadata = await data.json();
  metadata.image = metadata.image.replace(
    'ipfs://',
    'https://opensea.mypinata.cloud/ipfs/'
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

export const dummyTurtle1 = {
  tokenId: 1,
  tokenUri:
    'ipfs://bafyreicjwky6t2dcdqpj6r6lx2tl2rgdo5riazknoq4yzgyvkrhyuxyqfm/metadata.json',
  metadata: {
    name: 'Floppy Turtle 1',
    description: 'A Turtle that is on a journey in the river',
    componentIndices: {
      eyes: 'eyes_1.png',
      hands: 'left_hand_1.png',
      head: 'head_1.png',
      legs: 'left_foot_1.png',
      shell: 'in_shell_1.png',
      shellOuter: 'out_shell_1.png',
      tail: 'tail_1.png',
    },
    attributes: [
      {
        trait_type: 'speed',
        value: 10,
      },
    ],
    image:
      'https://cloudflare-ipfs.com/ipfs/bafybeihjzfdlnzw7xfpc33o3cf7tunqcyj6ithepao3apdzykj4gvvug5y/randomTurtle.png',
  },
};

export const dummyTurtle2 = {
  tokenId: 2,
  tokenUri:
    'ipfs://bafyreicjwky6t2dcdqpj6r6lx2tl2rgdo5riazknoq4yzgyvkrhyuxyqfm/metadata.json',
  metadata: {
    name: 'Floppy Turtle 2',
    description: 'A Turtle that is on a journey in the river',
    componentIndices: {
      eyes: 'eyes_1.png',
      hands: 'left_hand_1.png',
      head: 'head_1.png',
      legs: 'left_foot_1.png',
      shell: 'in_shell_1.png',
      shellOuter: 'out_shell_1.png',
      tail: 'tail_1.png',
    },
    attributes: [
      {
        trait_type: 'speed',
        value: 15,
      },
    ],
    image:
      'https://cloudflare-ipfs.com/ipfs/bafybeihjzfdlnzw7xfpc33o3cf7tunqcyj6ithepao3apdzykj4gvvug5y/randomTurtle.png',
  },
};

export const dummyTurtle3 = {
  tokenId: 3,
  tokenUri:
    'ipfs://bafyreicjwky6t2dcdqpj6r6lx2tl2rgdo5riazknoq4yzgyvkrhyuxyqfm/metadata.json',
  metadata: {
    name: 'Floppy Turtle 3',
    description: 'A Turtle that is on a journey in the river',
    componentIndices: {
      eyes: 'eyes_1.png',
      hands: 'left_hand_1.png',
      head: 'head_1.png',
      legs: 'left_foot_1.png',
      shell: 'in_shell_1.png',
      shellOuter: 'out_shell_1.png',
      tail: 'tail_1.png',
    },
    attributes: [
      {
        trait_type: 'speed',
        value: 20,
      },
    ],
    image:
      'https://cloudflare-ipfs.com/ipfs/bafybeihjzfdlnzw7xfpc33o3cf7tunqcyj6ithepao3apdzykj4gvvug5y/randomTurtle.png',
  },
};

export const dummyTurtle4 = {
  tokenId: 4,
  tokenUri:
    'ipfs://bafyreicjwky6t2dcdqpj6r6lx2tl2rgdo5riazknoq4yzgyvkrhyuxyqfm/metadata.json',
  metadata: {
    name: 'Floppy Turtle 4',
    description: 'A Turtle that is on a journey in the river',
    componentIndices: {
      eyes: 'eyes_1.png',
      hands: 'left_hand_1.png',
      head: 'head_1.png',
      legs: 'left_foot_1.png',
      shell: 'in_shell_1.png',
      shellOuter: 'out_shell_1.png',
      tail: 'tail_1.png',
    },
    attributes: [
      {
        trait_type: 'speed',
        value: 25,
      },
    ],
    image:
      'https://cloudflare-ipfs.com/ipfs/bafybeihjzfdlnzw7xfpc33o3cf7tunqcyj6ithepao3apdzykj4gvvug5y/randomTurtle.png',
  },
};

export const dummyTurtle5 = {
  tokenId: 5,
  tokenUri:
    'ipfs://bafyreicjwky6t2dcdqpj6r6lx2tl2rgdo5riazknoq4yzgyvkrhyuxyqfm/metadata.json',
  metadata: {
    name: 'Floppy Turtle 5',
    description: 'A Turtle that is on a journey in the river',
    componentIndices: {
      eyes: 'eyes_1.png',
      hands: 'left_hand_1.png',
      head: 'head_1.png',
      legs: 'left_foot_1.png',
      shell: 'in_shell_1.png',
      shellOuter: 'out_shell_1.png',
      tail: 'tail_1.png',
    },
    attributes: [
      {
        trait_type: 'speed',
        value: 100,
      },
    ],
    image:
      'https://cloudflare-ipfs.com/ipfs/bafybeihjzfdlnzw7xfpc33o3cf7tunqcyj6ithepao3apdzykj4gvvug5y/randomTurtle.png',
  },
};
