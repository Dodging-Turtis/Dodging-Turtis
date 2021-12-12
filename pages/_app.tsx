import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../src/redux';
import Wrapper from '../components/Wrapper';
import '../styles/main.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}

export default MyApp;
