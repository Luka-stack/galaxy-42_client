import Head from 'next/head';
import { NextPage } from 'next/types';

import { UserSettings } from '../../features/users/user-settings';

const SettingsPage: NextPage = () => {
  return (
    <div className="my-10 ml-32">
      <Head>
        <title>Password Settings | Galaxy 42</title>
      </Head>

      <UserSettings />
    </div>
  );
};

export default SettingsPage;
