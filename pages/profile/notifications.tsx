import Head from 'next/head';
import type { NextPage } from 'next/types';
import { useSetRecoilState } from 'recoil';

import { NotificationsDetails } from '../../features/notifications/notifications-details';
import { hasNewNotifications } from '../../lib/recoil/atoms';

const NotificationsPage: NextPage = () => {
  const setHasNew = useSetRecoilState(hasNewNotifications);

  setHasNew(false);

  return (
    <div className="w-full mt-10">
      <Head>
        <title>Notifications | Galaxy 42</title>
      </Head>

      <NotificationsDetails />
    </div>
  );
};

export default NotificationsPage;
