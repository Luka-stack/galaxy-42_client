import cookie from 'cookie';
import merge from 'deepmerge';
import isEqual from 'lodash.isequal';
import { IncomingMessage } from 'http';
import { GetServerSidePropsContext } from 'next';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import type { AppProps } from 'next/app';
import { useMemo } from 'react';
// import { createUploadLink } from 'apollo-upload-client';
import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLOT_STATE__';
export const COKKIES_TOKEN_NAME = 'jwt';

const getToken = (req?: IncomingMessage) => {
  const parsedCookie = cookie.parse(
    req ? req.headers.cookie ?? '' : document.cookie
  );

  return parsedCookie[COKKIES_TOKEN_NAME];
};

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = (ctx?: GetServerSidePropsContext) => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken(ctx?.req);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'same-origin',
  });

  const links = ApolloLink.from([authLink, uploadLink]);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // link: links,
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache(),
  });
};

export function initialApolloState(
  initialState: any = null,
  ctx?: GetServerSidePropsContext
) {
  const client = apolloClient ?? createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    client.cache.restore(data);
  }

  // For SSGG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps']
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROPERTY_NAME];
  const store = useMemo(() => initialApolloState(state), [state]);

  return store;
}
