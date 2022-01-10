import type { AppProps } from 'next/app';
import { StoreProvider } from '../store';
import '../styles/main.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
