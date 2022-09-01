import Head from 'next/head';
import type { NextPage } from 'next/types';
import { SearchIcon } from '@heroicons/react/outline';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Planet } from '../../lib/graphql/planets';
import { SelectionDropdown } from '../../components/selection-dropdown';
import { orderPlanets } from '../../utils/sorting';
import { SectionSeparator } from '../../components/section-separator';
import { useRouter } from 'next/router';
import { PlanetCard } from '../../components/planet-card';
import { planetsState } from '../../lib/recoil/atoms';

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
  const router = useRouter();

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
    const input = searchRef.current;

    if (!input) {
      return;
    }

    const filteredPlanets = planets.filter((planet) => {
      if (planet.name.toLowerCase().includes(input.value.toLocaleLowerCase())) {
        return true;
      }

      if (planet.topics.toLowerCase().includes(input.value.toLowerCase())) {
        return true;
      }
    });

    setPlanetsList(
      orderPlanets(filteredPlanets, sortingOption.id, orderOption.id)
    );
  };

  useEffect(() => {
    const input = searchRef.current;
    if (input) input.value = (router.query.search as string) || '';
  }, []);

  useEffect(() => {
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

        <SectionSeparator
          title="Search result"
          style="mt-20 px-4 justify-between"
        >
          <SelectionDropdown
            title="Sort by"
            selectables={sortingOptions}
            selected={sortingOption}
            setSelectable={setSortingOption}
          />
          <SelectionDropdown
            title="Order"
            selectables={orderOptions}
            selected={orderOption}
            setSelectable={setOrderOption}
          />
        </SectionSeparator>

        <div className="grid grid-cols-1 w-[80%] mx-auto divide-y divide-gx-purple-500">
          {planetsList.map((planet: Planet) => (
            <PlanetCard planet={planet} showBio={true} key={planet.uuid} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PlanetsPage;
