import dynamic from 'next/dynamic';

export default dynamic(() => import('../components/game'), { ssr: false });
