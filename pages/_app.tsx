import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useApollo } from '../lib/apollo';
import { RecoilRoot } from 'recoil';
import { Navbar } from '../components/navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login'];
  const authRoute = authRoutes.includes(pathname);

  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        {!authRoute && <Navbar />}
        <Component {...pageProps} />
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default MyApp;
