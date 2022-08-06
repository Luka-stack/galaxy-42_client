import { gql } from '@apollo/client';

export interface Planet {
  uuid: string;
  name: string;
  bio: string;
  topics: string;
}

export const ALL_PLANETS = gql`
  query getPlanets {
    planets {
      uuid
      name
      bio
      topics
    }
  }
`;
