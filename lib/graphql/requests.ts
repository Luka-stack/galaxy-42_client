import { gql } from '@apollo/client';

export interface Request {
  uuid: string;
  content: string;
  viewed: boolean;
  createdAt: Date;
  user: any;
  planet: any;
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
