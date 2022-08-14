import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next/types';
import { SectionSeparator } from '../../components/section-separator';

const Profile: NextPage = () => {
  return (
    <div className="mt-10 ml-32">
      <Head>
        <title>Takacchi | Galaxy 42</title>
      </Head>

      <main className="w-11/12 mx-auto">
        <div className="px-4 py-2 mx-auto space-x-4 border rounded-lg shadow-md shadow-gx-purple-500 w-fit border-gx-purple-500/50">
          <Link href="/planets/new">
            <button className="gx-btn">Create New Planet</button>
          </Link>
          <Link href="/profile/edit">
            <button className="gx-btn">Edit Profile</button>
          </Link>
          <button className="gx-btn">Change Password</button>
        </div>

        <section className="grid grid-cols-2 gap-14">
          <article>
            <SectionSeparator title="Planets you belong to" style="mt-20" />
          </article>
          <article>
            <SectionSeparator title="Planets you own" style="mt-20" />
          </article>
        </section>

        <section>
          <SectionSeparator title="The latest creations" style="mt-20" />
        </section>
      </main>
    </div>
  );
};

export default Profile;
