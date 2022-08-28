import Head from 'next/head';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import type { NextPage } from 'next/types';

import CoverImg from '../../../assets/CP-Cover.jpg';
import BGImg from '../../../assets/BG-Cosmo-Addons.jpg';
import { SectionSeparator } from '../../../components/section-separator';
import { RequestModal } from '../../../components/modals/request-modal';
import {
  CREATE_REQUEST,
  Request,
  RequestInput,
} from '../../../lib/graphql/requests';
import { useMutation } from '@apollo/client';
import { authState, planetsState } from '../../../lib/recoil/atoms';

const PlanetPage: NextPage = () => {
  const router = useRouter();
  const planetUuuid = router.query.uuid;

  const planets = useRecoilValue(planetsState);
  const user = useRecoilValue(authState);

  const planet = useMemo(() => {
    return planets.find((planet) => planet.uuid === planetUuuid);
  }, [planets, planetUuuid]);

  const [openModal, setOpenModal] = useState(false);

  const sendRequest = (content: string) => {
    if (!user || !planet) {
      return;
    }

    createRequest({
      variables: {
        userUuid: user!.uuid,
        request: {
          planetUuid: planet!.uuid,
          content,
        },
      },
    });
  };

  const [createRequest, { loading, error }] = useMutation<
    {
      createRequest: Request;
    },
    {
      userUuid: String;
      request: RequestInput;
    }
  >(CREATE_REQUEST, {
    update: (_cache, { data }) => console.log(data),
    onError: (err) => console.log(err),
  });

  return (
    <div className="mt-10 mb-10 ml-32">
      <Head>
        <title>{planet!.name} | Galaxy 42</title>
      </Head>

      <RequestModal
        open={openModal}
        setOpen={setOpenModal}
        setContent={sendRequest}
      />

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
              {planet!.name}
            </h1>
            {/* {user ? (
              <button
                className="absolute right-0 top-1 gx-btn"
                onClick={() => router.push(`${router.asPath}/edit`)}
              >
                Edit Planet
              </button>
            ) : ( */}
            <button
              className="absolute right-0 top-1 gx-btn"
              onClick={() => setOpenModal(true)}
            >
              Send Request to Join
            </button>
            {/* )} */}
          </div>

          <div className="relative grid grid-cols-1 mt-10 lg:grid-cols-4">
            <div className="w-full col-span-3">
              <section>
                <SectionSeparator title="Bio" />
                <p className="px-10 mt-4 text-purplish-500">{planet!.bio}</p>
              </section>

              <section>
                <SectionSeparator title="Requirements" style="mt-20" />
                <p className="px-10 mt-4 text-purplish-500">
                  {planet!.requirements}
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
                {planet!.topics.split(' ').map((topic) => (
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
    </div>
  );
};

export default PlanetPage;
