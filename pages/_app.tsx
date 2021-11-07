import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Layout from '../src/components/layout';
import { store } from '../src/redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
