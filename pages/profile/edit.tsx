import Head from 'next/head';
import type { NextPage } from 'next/types';
import { useRecoilValue } from 'recoil';
import { UserEdit } from '../../features/users/user-edit';

import { authState } from '../../lib/recoil/atoms';

const EditProfile: NextPage = () => {
  const user = useRecoilValue(authState);

  return (
    <div className="w-full my-10">
      <Head>
        <title>{user?.username || 'Edit Profile'} | Galaxy 42</title>
      </Head>

      <UserEdit />
    </div>
  );
};

export default EditProfile;
