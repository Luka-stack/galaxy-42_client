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

export const GET_PLANET = gql`
  query getPlanet($planetUuid: String!) {
    getPlanet(planetUuid: $planetUuid) {
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

export const GET_PLANET_AUTH = gql`
  query getPlanetAuth($planetUuid: String!) {
    getPlanetAuth(planetUuid: $planetUuid) {
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
  mutation createPlanet($planet: PlanetInput!) {
    createPlanet(planet: $planet) {
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
