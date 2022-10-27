import { useRouter } from 'next/router';
import React, { FunctionComponent, useEffect, useState } from 'react';

import { getJwtToken } from '../../lib/access-token';
import { ChatNavigation } from '../chat/chat-navigation';

interface Props {
  children: React.ReactNode;
}

const protectedRoutes = [
  '/profile',
  '/profile/edit',
  '/profile/settings',
  '/profile/notifications',
  '/planets/new',
];

export const RouteGuard: FunctionComponent<Props> = ({ children }) => {
  const router = useRouter();
  const [canActive, setCanActive] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setCanActive(false);
    router.events.on('routeChangeStart', hideContent);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authCheck = (url: string) => {
    const path = url.split('?')[0];

    if (
      (protectedRoutes.includes(path) || path.includes('chat')) &&
      !getJwtToken()
    ) {
      setCanActive(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      });
    } else {
      setCanActive(true);
    }
  };

  return (
    <>
      {getJwtToken() && <ChatNavigation />}
      {canActive && children}
    </>
  );
};
