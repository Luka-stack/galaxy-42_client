import { gql } from '@apollo/client';

export interface Planet {
  uuid: string;
  name: string;
  bio: string;
  requirements: string;
  topics: string;
  imageUrl: string;
  isPublic: boolean;
}

export interface PlanetInput {
  name: string;
  bio: string;
  topics: string;
  requirements: string;
  isPublic: boolean;
  image: File | null;
}

export interface UpdatePlanetInput {
  bio: string;
  requirements: string;
  topics: string;
  isPublic: boolean;
  image: File | null;
}

export const ALL_PLANETS = gql`
  query getPlanets {
    planets {
      uuid
      name
      bio
      topics
      requirements
      imageUrl
      isPublic
    }
  }
`;

export const CREATE_PLANET = gql`
  mutation createPlanet($userId: String!, $planet: PlanetInput!) {
    createPlanet(userId: $userId, planet: $planet) {
      uuid
      name
      bio
      requirements
      topics
      imageUrl
      isPublic
    }
  }
`;

export const UPDATE_PLANET = gql`
  mutation updatePlanet($planetUuid: String!, $planet: UpdatePlanetInput!) {
    updatePlanet(planetUuid: $planetUuid, planet: $planet) {
      uuid
      name
      bio
      requirements
      topics
      imageUrl
      isPublic
    }
  }
`;
