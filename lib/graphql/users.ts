import { gql } from '@apollo/client';

export interface User {
  uuid: string;
  username: string;
  email: string;
  bio: string;
  topics: string;
  planets: any;
}

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export interface LoginInput {
  user: {
    email: string;
    password: string;
  };
}

export interface UserInput {
  // username?: string;
  // email?: string;
  bio: string;
  topics: string;
}

export const REGISTER_USER = gql`
  mutation register($user: RegisterInput!) {
    register(user: $user) {
      uuid
    }
  }
`;

export const LOGIN_USER = gql`
  query login($user: LoginInput!) {
    login(user: $user) {
      uuid
      username
      email
      bio
      topics
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: String!, $user: UserInput!) {
    updateUser(userId: $userId, user: $user) {
      uuid
      username
      email
      bio
      topics
    }
  }
`;
