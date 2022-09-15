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

export const SET_NOTIFICATIONS_VIEWED = gql`
  mutation notificationsViewed($notificationUuids: [String!]!) {
    notificationsViewed(notificationUuids: $notificationUuids) {
      uuid
    }
  }
`;

export const DELETE_NOTIFICATIONS = gql`
  mutation deleteNotification($notificationUuids: [String!]!) {
    deleteNotification(notificationUuids: $notificationUuids) {
      uuid
    }
  }
`;
