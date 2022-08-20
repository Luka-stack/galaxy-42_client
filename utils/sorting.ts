import { Planet } from '../lib/graphql/planets';

const sortByName = (
  planetA: Planet,
  planetB: Planet,
  isASC: boolean
): number => {
  let lowerFir = planetA.name.toLowerCase();
  let lowerSec = planetB.name.toLowerCase();

  isASC = !isASC;

  if (lowerFir < lowerSec) return -1 + +!!isASC * 2;
  if (lowerFir > lowerSec) return 1 - +!!isASC * 2;

  return 0;
};

// const sortByDate = (
//   planetA: Planet,
//   planetB: Planet,
//   isASC: boolean
// ): number => {
//   let dateFir = new Date(planetA.modified).getTime();
//   let dateSec = new Date(planetB.modified).getTime();

//   if (isASC) {
//     return dateSec - dateFir;
//   }

//   return dateFir - dateSec;
// };

export const orderPlanets = (
  planets: Planet[],
  sorting: string,
  order: string
) => {
  const newPlanets = planets;
  const isASC = order === 'asc';

  if (sorting === 'name') {
    newPlanets.sort((planetA, planetB) => sortByName(planetA, planetB, isASC));
  }

  return newPlanets;
};
