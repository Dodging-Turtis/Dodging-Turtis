import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useStore } from '../../mobx';

function UserNftCard({ turtle }: { turtle: IUserNftWithMetadata }) {
  const store = useStore();
  const [processing, setProcessing] = useState(false);

  const saleHandler = useCallback(async () => {
    setProcessing(true);
    await store.setForSale(turtle.tokenId);
    setProcessing(false);
    store.fetchUserNfts();
  }, [store, turtle]);

  return (
    <div
      className={`container w-72 text-center p-3 border-0 rounded-lg bg-whiteish font-primary ${
        processing ? 'animate-pulse' : ''
      }`}>
      <div className='text-xl px-2'>
        <h5 className='text-left text-xl'>{turtle.metadata.name}</h5>
      </div>
      <div className='bg-blue w-cover border-0 rounded-lg p-2'>
        <Image
          className='pt-5'
          src={turtle.metadata.image}
          blurDataURL='/assets/TurtlePlaceholder.png'
          alt='placeholder'
          width={220}
          height={240}
        />
        <div className='px-1 py-1 w-2/4 h-10 mx-auto flex flex-row bg-whiteish hover:bg-white rounded-full items-center justify-center'>
          <button className='inline-block' onClick={saleHandler}>
            Put for sale
          </button>
        </div>
      </div>
      <div className='text-xl w-full flex flex-row flex-wrap justify-center py-1'>
        {turtle.metadata.attributes.map((attr) => (
          <div className='px-2' key={attr.trait_type}>
            {attr.trait_type} : {attr.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(UserNftCard);
