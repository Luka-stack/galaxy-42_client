import { gql } from '@apollo/client';
import { Planet } from './planets';

export interface User {
  uuid: string;
  username: string;
  email: string;
  bio: string;
  topics: string;
  imageUrl: string;
  planets: {
    role: 'ADMIN' | 'USER';
    planet: Planet;
  }[];
}

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserInput {
  username: string;
  email: string;
  bio: string;
  topics: string;
  image: File | null;
}

export const REGISTER_USER = gql`
  mutation register($user: RegisterInput!) {
    register(user: $user) {
      uuid
    }
  }
`;

export const LOGIN_USER = gql`
  query login($login: LoginInput!) {
    login(login: $login) {
      uuid
      username
      email
      bio
      topics
      imageUrl
      planets {
        role
        planet {
          uuid
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userInput: UserInput!) {
    updateUser(userInput: $userInput) {
      uuid
      username
      email
      bio
      topics
      imageUrl
      planets {
        role
        planet {
          uuid
        }
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      uuid
      username
      email
      bio
      topics
      imageUrl
      planets {
        role
        planet {
          uuid
        }
      }
    }
  }
`;
