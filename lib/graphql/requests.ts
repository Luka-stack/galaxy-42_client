import { gql } from '@apollo/client';
import { Planet } from './planets';
import { User } from './users';

export interface Request {
  uuid: string;
  content?: string;
  viewed: boolean;
  createdAt: Date;
  user: User;
  planet: Planet;
}

export interface CombinedRequests {
  users: Request[];
  planets: Request[];
}

export interface RequestInput {
  planetUuid: string;
  content?: string;
}

export const CREATE_REQUEST = gql`
  mutation createRequest($request: RequestInput!) {
    createRequest(request: $request) {
      uuid
    }
  }
`;

export const GET_REQUESTS = gql`
  query getRequests {
    getRequests {
      users {
        uuid
        content
        viewed
        createdAt
        user {
          uuid
          username
        }
        planet {
          uuid
          name
        }
      }
      planets {
        uuid
        content
        viewed
        createdAt
        user {
          uuid
          username
        }
        planet {
          uuid
          name
        }
      }
    }
  }
`;

export const SET_REQUESTS_VIEWED = gql`
  mutation requestsViewed($requestUuids: [String!]!) {
    requestsViewed(requestUuids: $requestUuids) {
      uuid
    }
  }
`;

export const RESOLVE_REQUEST = gql`
  mutation resolveRequest($requestUuid: String!, $rejected: Boolean!) {
    resolveRequest(requestUuid: $requestUuid, rejected: $rejected)
  }
`;

export const REQUEST_CREATED = gql`
  subscription requestCreated {
    requestCreated {
      type
      request {
        uuid
        content
        viewed
        createdAt
        user {
          uuid
          username
        }
        planet {
          uuid
          name
        }
      }
    }
  }
`;
