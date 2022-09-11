import Head from 'next/head';
import type { NextPage } from 'next/types';

import { NotificationsDetails } from '../../features/notifications/notifications-details';

const NotificationsPage: NextPage = () => {
  return (
    <div className="h-screen mt-10 ml-32">
      <Head>
        <title>Notifications | Galaxy 42</title>
      </Head>

      <NotificationsDetails />
    </div>
  );
};

export default NotificationsPage;
