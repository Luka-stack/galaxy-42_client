import { gql } from '@apollo/client';
import { Planet } from './planets';

export interface Notification {
  uuid: string;
  planet: Planet;
  rejected: boolean;
  viewed: boolean;
  createdAt: Date;
}

export const GET_NOTIFICATIONS = gql`
  query getNotifications {
    getNotifications {
      uuid
      rejected
      viewed
      createdAt
      planet {
        uuid
        name
      }
    }
  }
`;
