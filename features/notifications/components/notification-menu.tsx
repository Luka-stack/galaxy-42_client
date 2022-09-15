import classNames from 'classnames';

interface Props {
  option: string;
  setOption: (value: 'all' | 'new' | 'seen' | 'myReq' | 'planetsReq') => void;
  hasNewNotifications: boolean;
  newNotificationCount: number;
  seenNotificationCount: number;
  hasNewPlanetsRequests: boolean;
}

export const NotificationMenu = ({
  option,
  setOption,
  seenNotificationCount,
  newNotificationCount,
  hasNewNotifications,
  hasNewPlanetsRequests,
}: Props) => {
  return (
    <section className="w-40 h-full pt-4 pl-4 bg-gx-purple-500/10 text-purplish-500 shrink-0">
      <h3
        className={classNames(
          'relative text-lg font-bold hover:scale-105 cursor-pointer',
          { 'underline underline-offset-4': option === 'all' }
        )}
        onClick={() => setOption('all')}
      >
        Notifications
        {hasNewNotifications && (
          <div className="absolute top-0 w-3 h-3 rounded-full bg-gx-purple-50 right-7"></div>
        )}
      </h3>
      <h5
        className={classNames(
          'relative mt-1 ml-5 cursor-pointer hover:scale-105',
          { 'underline underline-offset-4': option === 'new' }
        )}
        onClick={() => setOption('new')}
      >
        New
        <span className="absolute top-0 text-xs left-10 text-gx-purple-50">
          {newNotificationCount}
        </span>
      </h5>
      <h5
        className={classNames(
          'relative mt-1 ml-5 cursor-pointer hover:scale-105',
          { 'underline underline-offset-4': option === 'seen' }
        )}
        onClick={() => setOption('seen')}
      >
        Seen
        <span className="absolute top-0 text-xs left-10 text-gx-purple-50">
          {seenNotificationCount}
        </span>
      </h5>
      <h3
        className={classNames(
          'relative mt-5 text-lg font-bold hover:scale-105 cursor-pointer',
          {
            'underline underline-offset-4': option === 'myReq',
          }
        )}
        onClick={() => setOption('myReq')}
      >
        My Requests
      </h3>
      <h3
        className={classNames(
          'relative mt-5 text-lg font-bold hover:scale-105 cursor-pointer',
          {
            'underline underline-offset-4': option === 'planetsReq',
          }
        )}
        onClick={() => setOption('planetsReq')}
      >
        {`Planets' Requests`}
        {hasNewPlanetsRequests && (
          <div className="absolute top-0 w-3 h-3 rounded-full bg-gx-purple-50 right-16"></div>
        )}
      </h3>
    </section>
  );
};
