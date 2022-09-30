import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useRef, useState, KeyboardEvent, useEffect } from 'react';
import { PlanetCard } from '../../components/planets/planet-card';
import { SectionSeparator } from '../../components/section-separator';
import { SelectionDropdown } from '../../components/selection-dropdown';
import { Planet } from '../../lib/graphql/planets';
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

interface PageProps {
  planets: Planet[];
}

export const PlanetSearch = ({ planets }: PageProps) => {
  const router = useRouter();

  const [planetsList, setPlanetsList] = useState<Planet[]>(planets);
  const [sortingOption, setSortingOption] = useState(sortingOptions[2]);
  const [orderOption, setOrderOption] = useState(orderOptions[0]);

  const searchRef = useRef<HTMLInputElement>(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    search();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortingOption, orderOption]);

  return (
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
  );
};
