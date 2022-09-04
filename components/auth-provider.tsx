import { useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import { useSetRecoilState } from 'recoil';
import { ME } from '../lib/graphql/users';
import { authState } from '../lib/recoil/atoms';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const setAuth = useSetRecoilState(authState);

  const { loading, error } = useQuery(ME, {
    onCompleted: ({ me }) => setAuth(me),
    onError: (err) => console.log(err),
  });

  return <>{children}</>;
};
