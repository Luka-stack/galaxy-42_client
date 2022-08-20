import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next/types';
import { ArrowSmUpIcon, SearchIcon } from '@heroicons/react/outline';

import CosmoBg from '../../assets/BG-Cosmo-Section.png';
import { PlanetList } from '../../components/planet-list';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { planetsState } from '../../lib/recoil/atoms/planets-atom';
import { Planet } from '../../lib/graphql/planets';
import { Dropdown } from '../../components/dropdown';
import { orderPlanets } from '../../utils/sorting';

const sortingOptions = [
  {
    id: 'members',
    label: 'Members',
  },
  {
    id: 'created',
    label: 'Created',
  },
  {
    id: 'name',
    label: 'Name',
  },
];

const orderOptions = [
  {
    id: 'desc',
    label: 'Descending',
  },
  {
    id: 'asc',
    label: 'Ascending',
  },
];

const PlanetsPage: NextPage = () => {
  const planets = useRecoilValue(planetsState);

  const searchRef = useRef<HTMLInputElement | null>(null);

  const [planetsList, setPlanetsList] = useState<Planet[]>(planets);
  const [sortingOption, setSortingOption] = useState(sortingOptions[2]);
  const [orderOption, setOrderOption] = useState(orderOptions[0]);

  const onEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  const search = () => {
    console.log('search');

    const input = searchRef.current;

    if (!input) {
      return;
    }

    const filteredPlanets = planets.filter((planet) => {
      if (planet.name.includes(input.value)) {
        return true;
      }

      if (planet.topics.includes(input.value)) {
        return true;
      }
    });

    setPlanetsList(
      orderPlanets(filteredPlanets, sortingOption.id, orderOption.id)
    );
  };

  useEffect(() => {
    console.log('useEffect');
    search();
  }, [sortingOption, orderOption]);

  return (
    <div className="my-10 ml-32">
      <Head>
        <title>Planets | Galaxy 42</title>
      </Head>

      <main className="w-11/12 mx-auto">
        <section className="flex w-1/2 h-12 mx-auto overflow-hidden border-2 border-gx-purple-500/60 rounded-3xl">
          <SearchIcon
            className="w-12 px-2 cursor-pointer text-gx-purple-500 hover:bg-gx-purple-500 hover:text-purplish-500 active:scale-105"
            onClick={search}
          />
          <input
            ref={searchRef}
            onKeyDown={onEnter}
            type="text"
            placeholder="Search for name, topic or key word"
            className="w-full px-2 bg-transparent text-purplish-500 focus:outline-none"
          />
        </section>

        <section className="relative flex items-center justify-between w-full h-12 px-4 mt-20 rounded-full ">
          <Image
            src={CosmoBg}
            alt="separator"
            layout="fill"
            className="absolute rounded-full opacity-40 -z-50"
          />

          <h1 className="text-2xl font-bold text-gx-purple-500">Results</h1>

          <div className="z-10 flex space-x-5">
            <Dropdown
              title="Sort by"
              selectables={sortingOptions}
              selected={sortingOption}
              setSelectable={setSortingOption}
            />
            <Dropdown
              title="Order"
              selectables={orderOptions}
              selected={orderOption}
              setSelectable={setOrderOption}
            />
            {/* <div className="flex items-center px-3 py-1 rounded-full bg-bg-500 text-gx-purple-500">
              Order: DESC
              <ArrowSmUpIcon className="w-5 ml-1 stroke-2 text-gx-purple-500" />
            </div> */}
          </div>
        </section>

        <PlanetList planets={planetsList} loading={false} />
      </main>
    </div>
  );
};

export default PlanetsPage;
