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
