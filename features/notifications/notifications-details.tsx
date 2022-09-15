import { useMemo, useState } from 'react';

import { useAuthState } from '../../context/auth-provider';
import { NotificationList } from './components/notification-list';
import { NotificationMenu } from './components/notification-menu';
import { RequestList } from './components/request-list';

export const NotificationsDetails = () => {
  const { myRequests, planetsRequests, notifications } = useAuthState();

  const { newNotifications, seenNotifications, hasNewNotifications } =
    useMemo(() => {
      const newNotifications = [];
      const seenNotifications = [];
      let hasNewNotifications = false;

      for (let notify of notifications) {
        if (notify.viewed) {
          seenNotifications.push(notify);
        } else {
          newNotifications.push(notify);
          hasNewNotifications = true;
        }
      }

      return {
        newNotifications,
        seenNotifications,
        hasNewNotifications,
      };
    }, [notifications]);

  const hasNewPlanetsRequests = useMemo(() => {
    return planetsRequests.some((req) => req.viewed === false);
  }, [planetsRequests]);

  const [option, setOption] = useState<
    'all' | 'new' | 'seen' | 'myReq' | 'planetsReq'
  >('all');

  return (
    <main className="w-full h-full px-5 mx-auto">
      <div className="flex w-full h-full border border-b-0 rounded-b-none border-gx-purple-500/50 rounded-2xl">
        <NotificationMenu
          option={option}
          setOption={setOption}
          hasNewNotifications={hasNewNotifications}
          seenNotificationCount={seenNotifications.length}
          newNotificationCount={newNotifications.length}
          hasNewPlanetsRequests={hasNewPlanetsRequests}
        />

        <section className="w-full px-4 pt-4 space-y-5">
          <NotificationList
            tab={option}
            allNotifications={notifications}
            seenNotifications={seenNotifications}
            newNotifications={newNotifications}
          />
          <RequestList
            tab={option}
            myRequests={myRequests}
            planetsRequests={planetsRequests}
          />
        </section>
      </div>
    </main>
  );
};
