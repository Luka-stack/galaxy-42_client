import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';

import CoverImg from '../../../assets/CP-Cover.jpg';
import BGImg from '../../../assets/BG-Cosmo-Addons.jpg';
import { SectionSeparator } from '../../../components/section-separator';

const PlanetPage: NextPage = () => {
  const router = useRouter();
  const planetUuuid = router.query.uuid;

  return (
    <div className="mt-10 mb-10 ml-32">
      <Head>
        <title>React Masters | Galaxy 42</title>
      </Head>

      <main className="flex items-center w-4/5 mx-auto">
        <div className="flex flex-col">
          <div className="relative w-full border rounded-lg shadow-md h-80 border-gx-purple-500 shadow-purple-neon-500">
            <Image
              src={CoverImg}
              alt="Planet Img"
              layout="fill"
              className="rounded-lg"
            />
          </div>

          <div className="relative my-10">
            <h1 className="self-start text-5xl font-bold leading-10 text-gx-purple-500">
              React Masters
            </h1>
            <button className="absolute right-0 top-1 gx-btn">
              Send Request to Join
            </button>
          </div>

          <div className="relative grid grid-cols-1 mt-10 lg:grid-cols-4">
            <div className="w-full col-span-3">
              <section>
                <SectionSeparator title="Bio" />
                <p className="px-10 mt-4 text-purplish-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </section>

              <section>
                <SectionSeparator title="Requirements" style="mt-20" />
                <p className="px-10 mt-4 text-purplish-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </section>
            </div>

            <section className="relative lg:h-fit lg:w-40 lg:shadow-md lg:shadow-gx-purple-500 lg:border lg:border-gx-purple-500/20 lg:p-2 rounded-2xl lg:justify-self-end">
              <Image
                src={BGImg}
                alt=""
                layout="fill"
                className="!hidden opacity-50 -z-50 lg:!inline"
              />
              <SectionSeparator title="Topics" style="mt-20 lg:hidden" />
              <h3 className="hidden text-lg font-bold text-center lg:block text-gx-purple-500">
                Topics
              </h3>
              <div className="flex flex-wrap gap-4 px-10 mt-4 lg:px-0 lg:items-center lg:flex-col">
                <span className="px-3 py-1 text-sm text-blue-400 rounded-full bg-blue-900/50">
                  ReactJs
                </span>
                <span className="px-3 py-1 text-sm text-blue-400 rounded-full bg-blue-900/50 max-w-[7rem] break-words">
                  RestJs
                </span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlanetPage;
