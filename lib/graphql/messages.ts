import { gql } from '@apollo/client';

export interface Message {
  uuid: string;
  content: string;
  createdAt: string;
  author: {
    uuid: string;
    username: string;
    imageUrl: string;
  };
}

export interface QueryMessageInput {
  recipient: string;
  toChannel: boolean;
}

export const GET_MESSAGES = gql`
  query getMessages($query: QueryMessageInput!) {
    getMessages(query: $query) {
      uuid
      content
      createdAt
      author {
        uuid
        username
        imageUrl
      }
    }
  }
`;
