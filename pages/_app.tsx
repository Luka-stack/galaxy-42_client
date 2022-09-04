import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Navbar } from '../components/navbar';
import { useRouter } from 'next/router';
import { useApollo } from '../lib/apollo';
import { AuthProvider } from '../components/auth-provider';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login'];
  const authRoute = authRoutes.includes(pathname);

  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <AuthProvider>
          {!authRoute && <Navbar />}
          <Component {...pageProps} />
        </AuthProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default MyApp;
