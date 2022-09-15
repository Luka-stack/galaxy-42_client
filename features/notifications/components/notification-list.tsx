import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useAuthDispatch } from '../../../context/auth-provider';
import {
  DELETE_NOTIFICATIONS,
  Notification,
  SET_NOTIFICATIONS_VIEWED,
} from '../../../lib/graphql/notifications';
import { NotificationCard } from '../notification-card';

interface Props {
  tab: string;
  allNotifications: Notification[];
  newNotifications: Notification[];
  seenNotifications: Notification[];
}

export const NotificationList = ({
  tab,
  allNotifications,
  seenNotifications,
  newNotifications,
}: Props) => {
  const dispatch = useAuthDispatch();

  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  const selectAll = () => {
    if (tab === 'all') {
      setSelectedNotifications(allNotifications.map((n) => n.uuid));
    } else if (tab === 'new') {
      setSelectedNotifications(newNotifications.map((n) => n.uuid));
    } else {
      setSelectedNotifications(seenNotifications.map((n) => n.uuid));
    }
  };

  const [notificationsViewed] = useMutation(SET_NOTIFICATIONS_VIEWED, {
    update: (_cache, _data) => {
      dispatch('UPDATE_NOTIFICATIONS', selectedNotifications);
      setSelectedNotifications([]);
    },
    onError: (err) => console.log(err),
  });

  const [deleteNotification] = useMutation(DELETE_NOTIFICATIONS, {
    update: (_cache, _data) => {
      dispatch('DELETE_NOTIFICATIONS', selectedNotifications);
      setSelectedNotifications([]);
    },
    onError: (err) => console.log(err),
  });

  const onDelete = () => {
    deleteNotification({
      variables: {
        notificationUuids: selectedNotifications,
      },
    });
  };

  const onViewed = () => {
    notificationsViewed({
      variables: {
        notificationUuids: selectedNotifications,
      },
    });
  };

  const options = (
    <div className="flex justify-between font-medium text-gx-purple-500">
      <div className="flex space-x-2">
        <button
          className="hover:text-gx-purple-600 active:scale-105"
          onClick={selectAll}
        >
          Select All
        </button>
        <button
          className="hover:text-gx-purple-600 active:scale-105"
          onClick={() => setSelectedNotifications([])}
        >
          Deselect All
        </button>
      </div>
      <div className="flex space-x-2">
        <button
          className="hover:text-gx-purple-600 active:scale-105"
          disabled={selectedNotifications.length === 0}
          onClick={onViewed}
        >
          Mark as seen
        </button>
        <button
          className="hover:text-gx-purple-600 active:scale-105"
          disabled={selectedNotifications.length === 0}
          onClick={onDelete}
        >
          Delete selected
        </button>
      </div>
    </div>
  );

  if (tab === 'all') {
    return (
      <>
        {options}
        {allNotifications.map((n) => (
          <NotificationCard
            key={n.uuid}
            notification={n}
            selected={selectedNotifications.includes(n.uuid)}
            select={() =>
              setSelectedNotifications([...selectedNotifications, n.uuid])
            }
            unselect={() =>
              setSelectedNotifications(
                selectedNotifications.filter((uuid) => uuid !== n.uuid)
              )
            }
          />
        ))}
      </>
    );
  }

  if (tab === 'new') {
    return (
      <>
        {options}
        {newNotifications.map((n) => (
          <NotificationCard
            key={n.uuid}
            notification={n}
            selected={selectedNotifications.includes(n.uuid)}
            select={() =>
              setSelectedNotifications([...selectedNotifications, n.uuid])
            }
            unselect={() =>
              setSelectedNotifications(
                selectedNotifications.filter((uuid) => uuid !== n.uuid)
              )
            }
          />
        ))}
      </>
    );
  }

  if (tab === 'seen') {
    return (
      <>
        {options}
        {seenNotifications.map((n) => (
          <NotificationCard
            key={n.uuid}
            notification={n}
            selected={selectedNotifications.includes(n.uuid)}
            select={() =>
              setSelectedNotifications([...selectedNotifications, n.uuid])
            }
            unselect={() =>
              setSelectedNotifications(
                selectedNotifications.filter((uuid) => uuid !== n.uuid)
              )
            }
          />
        ))}
      </>
    );
  }

  return null;
};
