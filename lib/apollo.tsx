import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloLink,
  InMemoryCache,
  Operation,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { IncomingHttpHeaders } from 'http';
import isEqual from 'lodash.isequal';
import { AppProps } from 'next/app';
import { useMemo } from 'react';
import merge from 'deepmerge';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import decodeJWT, { JwtPayload } from 'jwt-decode';

import { getJwtToken, setJwtToken } from './access-token';

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const isServer = () => typeof window === 'undefined';

const getHeaders = () => {
  const headers = {} as any;
  const token = getJwtToken();
  if (token) headers['authorization'] = `Bearer ${token}`;
  return headers;
};

const operationIsSubscription = ({ query }: Operation): boolean => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
};

let graphqlWsLink: GraphQLWsLink | null = null;
const getOrCreateWebsocketLink = () => {
  graphqlWsLink ??= new GraphQLWsLink(
    createClient({
      url: 'ws://localhost:5000/graphql',
      connectionParams: () => {
        return { headers: getHeaders() };
      },
    })
  );

  return graphqlWsLink;
};

const makeTokenRefreshLink = () => {
  return new TokenRefreshLink({
    isTokenValidOrUndefined: (operation: Operation) => {
      const token = getJwtToken();

      if (operation.operationName === 'me' && !token) {
        return false;
      }

      if (!token) {
        return true;
      }

      const claims: JwtPayload = decodeJWT(token);
      const expirationTimeInSeconds = claims.exp! * 1000;
      const now = new Date();

      return expirationTimeInSeconds >= now.getTime();
    },
    fetchAccessToken: async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URI!, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query refreshToken {
              refreshToken {
                accessToken
              }
            }
          `,
        }),
      });

      return response.json();
    },
    handleFetch: (accessToken) => {
      setJwtToken(accessToken);
    },
    handleResponse: (_operation, _accessTokenField) => (response: any) => {
      // here you can parse response, handle errors, prepare returned token to
      // further operations
      // returned object should be like this:
      // {
      //    access_token: 'token string here'

      return { access_token: response.data.refreshToken.accessToken };
    },
    handleError: (error) => {
      console.warn('Your refresh token is invalid. Try to reauthenticate.');
      console.error(error);
      setJwtToken('');
    },
  });
};

const createLink = () => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location:`,
          locations,
          ` Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'include',
    fetchOptions: {
      mode: 'cors',
    },
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...getHeaders(),
      },
    }));

    return forward(operation);
  });

  if (isServer()) {
    return ApolloLink.from([
      makeTokenRefreshLink(),
      authLink,

      //@ts-ignore
      errorLink,

      httpLink,
    ]);
  } else {
    return ApolloLink.from([
      makeTokenRefreshLink(),
      authLink,

      //@ts-ignore
      errorLink,

      ApolloLink.split(
        operationIsSubscription,
        getOrCreateWebsocketLink(),
        httpLink
      ),
    ]);
  }
};

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  return new ApolloClient({
    ssrMode: isServer(),
    link: createLink(),
    cache: new InMemoryCache({
      possibleTypes: {
        authenticatedItem: ['User'],
      },
    }),
  });
};

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: InitialState | null;
}

export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null,
  }
) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (isServer()) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps']
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state]
  );
  return store;
}
