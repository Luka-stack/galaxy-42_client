import Image from 'next/image';

import BGImg from '../../assets/BG-Cosmo-Addons.jpg';
import { Planet } from '../../lib/graphql/planets';
import { SectionSeparator } from '../../components/section-separator';
import { useRouter } from 'next/router';
import { PlanetDetailButtons } from './planet-detail-buttons';
import { useAuthState } from '../../context/auth-provider';

interface PageProps {
  planet: Planet;
}

export const PlanetDetail = ({ planet }: PageProps) => {
  const router = useRouter();
  const { user } = useAuthState();

  return (
    <main className="flex items-center w-4/5 mx-auto">
      <div className="flex flex-col">
        <div className="relative w-full border rounded-lg shadow-md h-80 border-gx-purple-500 shadow-purple-neon-500">
          <Image
            src={planet.imageUrl}
            alt="Planet Img"
            layout="fill"
            className="rounded-lg"
          />
        </div>

        <div className="relative my-10">
          <h1 className="self-start text-5xl font-bold leading-10 text-gx-purple-500">
            {planet.name}
          </h1>
          {user && <PlanetDetailButtons uuid={planet.uuid} user={user} />}
        </div>

        <div className="relative grid grid-cols-1 mt-10 lg:grid-cols-4">
          <div className="w-full col-span-3">
            <section>
              <SectionSeparator title="Bio" style="pl-4" />
              <p className="px-10 mt-4 text-purplish-500">{planet.bio}</p>
            </section>

            <section>
              <SectionSeparator title="Requirements" style="mt-20 pl-4" />
              <p className="px-10 mt-4 text-purplish-500">
                {planet.requirements}
              </p>
            </section>
          </div>

          <section className="relative overflow-hidden lg:h-fit lg:w-40 lg:border-2 lg:border-gx-purple-500/60 lg:p-2 rounded-2xl lg:justify-self-end">
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
            <div className="z-10 flex flex-wrap gap-4 px-10 mt-4 lg:px-0 lg:items-center lg:flex-col">
              {planet.topics.split(' ').map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1 text-sm text-blue-400 rounded-full bg-blue-900/50 max-w-[7rem] break-words cursor-pointer z-10"
                  onClick={() =>
                    router.push({
                      pathname: '/planets',
                      query: { search: topic },
                    })
                  }
                >
                  {topic}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
