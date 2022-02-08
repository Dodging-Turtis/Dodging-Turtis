import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../mobx';
import avtar from '../../public/assets/website/avtar.webp';
import { useCallback, useState } from 'react';

function useHover() {
  const [hovering, setHovering] = useState(false);
  const onHoverProps = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
  };
  return [hovering, onHoverProps];
}

const Card = ({ turtle }: { turtle: IMarketNftWithMetadata }) => {
  const state = useStore();
  const [isHover, hoverProps] = useHover();

  const purchaseHandler = useCallback(() => {
    state.purchaseTurtle(turtle.itemId, turtle.price);
  }, [state, turtle]);

  const buttonText = isHover
    ? turtle.owner === state.accountAddress
      ? 'Owned'
      : 'Purchase'
    : `${turtle.price} MATIC`;

  return (
    <div className='container mx-auto w-64 text-center p-3 border-0 rounded-lg bg-whiteish font-primary'>
      <div className='px-2 flex flex-row w-full justify-start items-center'>
        <div className='h-full my-0 lg:px-2 '>
          {' '}
          <Image
            className='inline px-5 object-cover w-1/12 h-16 mr-2 rounded-full cursor-pointer'
            src={avtar}
            alt='avtar'
            height={35}
            width={35}
          />
        </div>
        <div className=' my-0'>
          {' '}
          <div className='text-left text-lg py-0 my-0'>
            {turtle.metadata.name}
          </div>
          <div className=' text-sm text-left -mt-1 py-0'>username</div>
        </div>
      </div>
      <div className='bg-blue w-cover border-0 rounded-lg'>
        <Image
          className='pt-5 mx-auto'
          src={turtle.metadata.image}
          blurDataURL='/assets/TurtlePlaceholder.png'
          placeholder='blur'
          alt='placeholder'
          width={220}
          height={240}
        />
        <button
          className='px-3 py-1 mb-2 mx-auto text-center bg-whiteish hover:scale-105 hover:brightness-105 rounded-full'
          onClick={purchaseHandler}
          {...hoverProps}>
          {buttonText}
        </button>
      </div>
      <div className='text-xl w-full flex flex-row flex-wrap justify-center'>
        {turtle.metadata.attributes.map((attr) => (
          <div className='px-2 py-1' key={attr.trait_type}>
            {attr.trait_type}: {attr.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Card);
