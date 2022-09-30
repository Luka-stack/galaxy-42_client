import { gql } from '@apollo/client';
import { Planet } from './planets';

export interface User {
  uuid: string;
  username: string;
  email: string;
  bio: string;
  topics: string;
  imageUrl: string;
  createdAt: string;
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

export interface PasswordInput {
  oldPassword: string;
  newPassword: string;
}

export const GET_USERS = gql`
  query getUsers {
    users {
      uuid
      username
      email
      bio
      topics
      imageUrl
      createdAt
      planets {
        role
        planet {
          uuid
          bio
          name
          imageUrl
          createdAt
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      uuid
      username
      email
      bio
      topics
      imageUrl
      createdAt
      planets {
        role
        planet {
          uuid
          bio
          name
          imageUrl
          createdAt
        }
      }
    }
  }
`;

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
      createdAt
      planets {
        role
        planet {
          uuid
          name
          imageUrl
          createdAt
        }
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logout {
    logout
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
      createdAt
      planets {
        role
        planet {
          uuid
          name
          imageUrl
          createdAt
        }
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($old: String!, $new: String!) {
    updatePassword(old: $old, new: $new)
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
      createdAt
      planets {
        role
        planet {
          uuid
          name
          imageUrl
          createdAt
        }
      }
    }
  }
`;
