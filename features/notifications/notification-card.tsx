import { TrashIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { Notification } from '../../lib/graphql/notifications';

interface Props {
  notification: Notification;
  selected: boolean;
  select: () => void;
  unselect: () => void;
}

export const NotificationCard = ({
  notification,
  select,
  unselect,
  selected,
}: Props) => {
  const notificationClicked = () => {
    if (selected) {
      unselect();
      return;
    }

    select();
  };

  return (
    <div
      key={notification.uuid}
      className={classNames(
        'flex items-center justify-between w-full h-16 border-t border-b cursor-pointer border-gx-purple-500/50 hover:bg-bg-600',
        { 'bg-bg-600': selected }
      )}
      onClick={notificationClicked}
    >
      <div className="flex items-center ml-4">
        {!notification.viewed && (
          <div className="w-3 h-3 mr-4 rounded-full bg-gx-purple-500"></div>
        )}
        <p className="text-purplish-500">
          <span className="font-bold underline text-gx-purple-500 underline-offset-4 hover:text-gx-purple-200">
            {notification.planet.name}
          </span>{' '}
          {notification.rejected
            ? 'has rejected your request'
            : 'has accepted your request'}
        </p>
      </div>
    </div>
  );
};
