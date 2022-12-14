import { useQuery, useSubscription } from '@apollo/client';
import { userAgent } from 'next/server';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MESSAGE_CREATED } from '../lib/graphql/messages';

import {
  GET_NOTIFICATIONS,
  NOTIFICATION_CREATED,
  Notification,
} from '../lib/graphql/notifications';
import {
  GET_REQUESTS,
  Request,
  REQUEST_CREATED,
} from '../lib/graphql/requests';
import { User } from '../lib/graphql/users';
import { chatId, chatMessages, hasNewNotifications } from '../lib/recoil/atoms';
import { useAuthDispatch } from './auth-provider';

const notificationRoute = '/profile/notifications';

interface Props {
  user: User;
}

export const UserData = ({ user }: Props) => {
  const dispatch = useAuthDispatch();
  const setHasNew = useSetRecoilState(hasNewNotifications);
  const currChatId = useRecoilValue(chatId);
  const [getChatMessages, setChatMessages] = useRecoilState(chatMessages);

  useQuery(GET_REQUESTS, {
    onCompleted: ({ getRequests }) => {
      dispatch('REQUESTS', getRequests);

      const hasNewUsers = getRequests.users.some(
        (r: Request) => r.viewed === false
      );
      const hasNewPlanets = getRequests.planets.some(
        (r: Request) => r.viewed === false
      );

      if (
        (hasNewUsers || hasNewPlanets) &&
        !document.location.pathname.match(notificationRoute)
      ) {
        setHasNew(true);
      }
    },
  });

  useQuery(GET_NOTIFICATIONS, {
    onCompleted: ({ getNotifications }) => {
      dispatch('NOTIFICATIONS', getNotifications);

      const hasNew = getNotifications.some(
        (n: Notification) => n.viewed === false
      );
      if (hasNew && !document.location.pathname.match(notificationRoute)) {
        setHasNew(hasNew);
      }
    },
  });

  useSubscription(NOTIFICATION_CREATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.notificationCreated) {
        dispatch('NEW_NOTIFICATION', subscriptionData.data.notificationCreated);

        if (!document.location.pathname.match(notificationRoute)) {
          setHasNew(true);
        }
      }
    },
  });

  useSubscription(REQUEST_CREATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.requestCreated) {
        if (subscriptionData.data.requestCreated.type === 'planets') {
          dispatch(
            'NEW_PLANETS_REQUEST',
            subscriptionData.data.requestCreated.request
          );
        } else {
          dispatch(
            'NEW_MY_REQUEST',
            subscriptionData.data.requestCreated.request
          );
        }
      }

      if (!document.location.pathname.match(notificationRoute)) {
        setHasNew(true);
      }
    },
  });

  useSubscription(MESSAGE_CREATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.messageCreated) {
        const message = subscriptionData.data?.messageCreated;
        let recipient = message.recipient;

        if (!message.toChannel && message.recipient === user.uuid) {
          recipient = message.author.uuid;
        }

        if (recipient !== currChatId) {
          // Show new message notification
          return;
        }

        setChatMessages([...getChatMessages, message]);
      }
    },
  });

  return <></>;
};
