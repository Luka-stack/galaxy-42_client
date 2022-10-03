import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

import { Navbar } from '../components/navbar';
import { useApollo } from '../lib/apollo';
import { AuthProvider } from '../context/auth-provider';
import { RouteGuard } from '../components/guards/route-guard';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login'];
  const authRoute = authRoutes.includes(pathname);

  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <AuthProvider>
          <RouteGuard>
            {!authRoute && <Navbar />}
            <Component {...pageProps} />
          </RouteGuard>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            rtl={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
          />
        </AuthProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default MyApp;
