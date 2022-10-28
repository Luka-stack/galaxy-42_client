import { gql } from '@apollo/client';

export interface Message {
  uuid: string;
  content: string;
  createdAt: string;
  toChannel: string;
  author: {
    uuid: string;
    username: string;
    imageUrl: string;
  };
}

export interface MessageInput {
  content: string;
  recipient: string;
  toChannel: boolean;
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

export const SEND_MESSAGE = gql`
  mutation sendMessage($message: MessageInput!) {
    sendMessage(message: $message)
  }
`;

export const MESSAGE_CREATED = gql`
  subscription messageCreated {
    messageCreated {
      uuid
      content
      createdAt
      toChannel
      recipient
      author {
        uuid
        username
        imageUrl
      }
    }
  }
`;
