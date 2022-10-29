import { gql } from '@apollo/client';

export interface Channel {
  uuid: string;
  name: string;
}

export interface ChannelInput {
  name: string;
  planetId: string;
}

export const CREATE_CHANNEL = gql`
  mutation createChannel($channel: ChannelInput!) {
    createChannel(channel: $channel) {
      uuid
    }
  }
`;
