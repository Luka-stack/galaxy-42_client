import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';

import ProfileImg from '../../assets/profile.jpg';
import { SectionSeparator } from '../../components/section-separator';

const UserProfile: NextPage = () => {
  const router = useRouter();
  const username = router.query.username;

  return (
    <div className="mt-10 ml-32">
      <Head>
        <title>{username} | Galaxy 42</title>
      </Head>

      <main className="flex flex-col items-center w-full">
        <div className="relative w-48 h-48 border rounded-full shadow-md border-gx-purple-500 shadow-purple-neon-500">
          <Image
            src={ProfileImg}
            alt="Profile Image"
            layout="fill"
            className="rounded-full"
          />
        </div>

        <h1 className="my-10 text-5xl font-bold leading-10 text-gx-purple-500">
          {username}
        </h1>

        <section className="w-3/5">
          <SectionSeparator title="Bio" style="mt-20" />
          <p className="px-10 mt-4 text-purplish-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>

        <section className="w-3/5">
          <SectionSeparator title="Topics" style="mt-20" />
          <div className="flex flex-wrap gap-4 px-10 mt-4">
            <span className="px-3 py-1 text-sm text-blue-400 rounded-full bg-blue-900/50">
              ReactJs
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
