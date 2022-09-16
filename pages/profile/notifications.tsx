import { useSubscription } from '@apollo/client';
import Head from 'next/head';
import type { NextPage } from 'next/types';
import { useEffect } from 'react';

import { NotificationsDetails } from '../../features/notifications/notifications-details';
import { NOTIFICATION_CREATED } from '../../lib/graphql/notifications';

const NotificationsPage: NextPage = () => {
  // TODO DELETE LATER
  const { data, loading } = useSubscription(NOTIFICATION_CREATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData.data);
    },
  });
  //

  useEffect(() => {
    console.log(data);
  }, [data]);

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
