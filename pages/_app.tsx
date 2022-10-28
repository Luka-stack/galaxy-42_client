import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import { useApollo } from '../lib/apollo';
import { AuthProvider } from '../context/auth-provider';
import { RouteGuard } from '../components/guards/route-guard';
import { Navigation } from '../components/navigation';
import { ChatNavigation } from '../components/chat/chat-navigation';
import { MessageProvider } from '../context/message-provider';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <AuthProvider>
          <div className="flex">
            <Navigation />

            <RouteGuard>
              <Component {...pageProps} />
            </RouteGuard>
          </div>
        </AuthProvider>
      </RecoilRoot>

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
    </ApolloProvider>
  );
}

export default MyApp;
