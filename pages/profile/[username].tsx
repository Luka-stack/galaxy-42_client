import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';

import ProfileImg from '../../assets/profile.jpg';
import CosmoBg from '../../assets/BG-Cosmo-Section.png';
import Placeholder from '../../assets/placeholder-1.png';
import { useState } from 'react';
import classNames from 'classnames';
import clip from 'text-clipper';

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation`;

const UserProfile: NextPage = () => {
  const router = useRouter();
  const username = router.query.username;

  const [showPlanets, setShowPlanets] = useState(true);

  const sliceText = (text: string): string => {
    if (text.length > 340) {
      return `${text.substring(0, 337)}...`;
    }

    return text;
  };

  return (
    <div className="h-screen mt-10 ml-32">
      <Head>
        <title>{`${username} | Galaxy 42`}</title>
      </Head>

      <main className="justify-center w-full h-full">
        {/* Right Panel */}
        <section className="fixed right-0 px-4 w-72 top-10 shrink-0">
          <div className="relative w-24 h-24 border rounded-full border-gx-purple-500">
            <Image
              src={ProfileImg}
              alt="Profile Image"
              layout="fill"
              className="rounded-full"
            />
          </div>

          <h1 className="mt-4 text-xl font-bold leading-10 text-gx-purple-500">
            {username}
          </h1>

          <p className="mt-4 text-sm text-purplish-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <div className="flex flex-col mt-4">
            <h3 className="text-lg font-bold text-purplish-300">Interests</h3>
            <span className="mt-1 text-sm text-blue-400">ReactJs</span>
            <span className="mt-1 text-sm text-blue-400">ReactJs</span>
          </div>
        </section>

        {/* Center Panel */}
        <section className="h-full px-10 border-r border-gx-purple-500/40 mr-72">
          <div className="relative h-12 mb-20 w-fll">
            <Image
              src={CosmoBg}
              alt="separator"
              layout="fill"
              className="absolute rounded-full opacity-40 -z-50"
            />

            <div className="z-10 flex w-full h-full">
              <div
                className={classNames(
                  'z-10 flex items-center justify-center w-1/2 h-full text-3xl font-bold rounded-l-full cursor-pointer text-gx-purple-500 border-gx-purple-500/50',
                  { 'border-b-2': !showPlanets },
                  {
                    'bg-bg-500 opacity-50 hover:bg-bg-500/40 hover:opacity-75':
                      showPlanets,
                  }
                )}
                onClick={() => setShowPlanets(false)}
              >
                <h2>Stories</h2>
              </div>
              <div
                className={classNames(
                  'flex items-center justify-center w-1/2 h-full text-3xl font-bold cursor-pointer text-gx-purple-500 rounded-r-full border-gx-purple-500/50',
                  { 'border-b-2': showPlanets },
                  {
                    'bg-bg-500 opacity-50 hover:bg-bg-500/40 hover:opacity-75':
                      !showPlanets,
                  }
                )}
                onClick={() => setShowPlanets(true)}
              >
                <h2>Planets</h2>
              </div>
            </div>
          </div>

          {showPlanets ? (
            <div className="space-y-5 divide-y divide-gx-purple-500">
              <div className="">
                <div className="flex justify-between space-x-20">
                  <div className="">
                    <h1 className="text-2xl font-bold cursor-pointer text-gx-purple-500 hover:text-gx-purple-300">
                      React Masters
                    </h1>
                    <p className="mt-5 overflow-hidden text-purplish-500">
                      {clip(text, 250, { html: true, maxLines: 3 })}
                    </p>
                    <p className="mt-4 text-sm font-light text-purplish-500">
                      Jul 6 2022
                    </p>
                  </div>
                  <div className="relative w-40 h-40 overflow-hidden border rounded-3xl shrink-0 border-gx-purple-500/50">
                    <Image src={Placeholder} layout="fill" alt="" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  <span className="px-3 py-1 text-sm text-blue-400 rounded-full cursor-pointer bg-blue-900/50 hover:bg-blue-900">
                    NextJs
                  </span>
                  <span className="px-3 py-1 text-sm text-blue-400 rounded-full cursor-pointer bg-blue-900/50 hover:bg-blue-900">
                    NextJs
                  </span>
                  <span className="px-3 py-1 text-sm text-blue-400 rounded-full cursor-pointer bg-blue-900/50 hover:bg-blue-900">
                    NextJs
                  </span>
                </div>
              </div>
              <div className="pt-5">
                <div className="flex space-x-20">
                  <div className="">
                    <h1 className="text-2xl font-bold cursor-pointer text-gx-purple-500">
                      React Masters
                    </h1>
                    <p className="mt-5 text-purplish-500 ">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </p>
                    <p className="mt-4 text-sm font-light text-purplish-500">
                      Jul 6 2022
                    </p>
                  </div>
                  <div className="relative w-40 h-40 overflow-hidden border rounded-3xl shrink-0 border-gx-purple-500/50">
                    <Image src={Placeholder} layout="fill" alt="" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  <span className="px-3 py-1 text-sm text-blue-400 rounded-full cursor-pointer bg-blue-900/50 hover:bg-blue-900">
                    NextJs
                  </span>
                  <span className="px-3 py-1 text-sm text-blue-400 rounded-full cursor-pointer bg-blue-900/50 hover:bg-blue-900">
                    NextJs
                  </span>
                  <span className="px-3 py-1 text-sm text-blue-400 rounded-full cursor-pointer bg-blue-900/50 hover:bg-blue-900">
                    NextJs
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white">Stories</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
