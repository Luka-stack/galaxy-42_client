import { gql } from '@apollo/client';
import { Channel } from './channels';

export interface Planet {
  uuid: string;
  name: string;
  bio: string;
  requirements: string;
  topics: string;
  imageUrl: string;
  isPublic: boolean;
  createdAt: number;
}

export interface ChatPlanet {
  uuid: string;
  name: string;
  channels: Channel[];
  users: {
    role: 'ADMIN' | 'USER';
    user: { uuid: string; username: string; imageUrl: string };
  }[];
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

export interface QueryPlanetInput {
  limit?: number;
  order?: string;
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
      createdAt
    }
  }
`;

export const QUERY_PLANETS = gql`
  query queryPlanets($query: QueryPlanetInput!) {
    queryPlanets(query: $query) {
      uuid
      name
      imageUrl
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
      createdAt
    }
  }
`;

export const GET_PLANET_FOR_CHAT = gql`
  query getMyPlanet($planetUuid: String!) {
    getMyPlanet(planetUuid: $planetUuid) {
      uuid
      name
      channels {
        uuid
        name
      }
      users {
        role
        user {
          uuid
          username
          imageUrl
        }
      }
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
      createdAt
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
      createdAt
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
      createdAt
    }
  }
`;
