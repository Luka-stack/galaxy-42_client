import { useState } from 'react';
import { Notification } from '../../../lib/graphql/notifications';
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
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  const options = (
    <div className="flex justify-between font-medium text-gx-purple-500">
      <div className="flex space-x-2">
        <button className="hover:text-gx-purple-600 active:scale-105">
          Select All
        </button>
        <button className="hover:text-gx-purple-600 active:scale-105">
          Deselect All
        </button>
      </div>
      <div className="flex space-x-2">
        <button className="hover:text-gx-purple-600 active:scale-105">
          Mark as seen
        </button>
        <button className="hover:text-gx-purple-600 active:scale-105">
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
