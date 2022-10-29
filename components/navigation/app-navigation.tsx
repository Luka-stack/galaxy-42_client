import Link from 'next/link';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { BellIcon, GlobeIcon } from '@heroicons/react/outline';

import LogoImg from '../../assets/black-hole_64.png';
import BGImg from '../../assets/BG-Cosmo-Addons.jpg';

import { useAuthState } from '../../context/auth-provider';
import { hasNewNotifications } from '../../lib/recoil/atoms';
import { LOGOUT_USER, User } from '../../lib/graphql/users';

interface Props {
  user: User | null;
}

export const AppNavigation = ({ user }: Props) => {
  const router = useRouter();
  const authRoute = ['/register', '/login'].includes(router.pathname);

  const hasNew = useRecoilValue(hasNewNotifications);

  const [logout] = useMutation(LOGOUT_USER, {
    onCompleted: (data) => {
      if (data.logout) {
        router.reload();
      }
    },
  });

  return (
    <div className="sticky top-0 flex flex-col items-center justify-center flex-none w-24 h-screen border-r border-gx-purple-500">
      <Image src={BGImg} alt="" layout="fill" className="opacity-50 -z-50" />

      <section className="absolute top-0">
        <Link href="/">
          <div className="relative self-start w-20 h-20 cursor-pointer mb-7 justify-self-start">
            <Image src={LogoImg} alt="logo" layout="fill" />
          </div>
        </Link>
      </section>

      <section className="z-10 flex flex-col items-center justify-center space-y-4">
        {user && (
          <>
            <Link href="/profile">
              <div className="relative w-12 h-12 border border-purple-500 rounded-full cursor-pointer hover:scale-110 active:scale-125">
                <Image
                  src={user.imageUrl}
                  alt="profile"
                  layout="fill"
                  className="rounded-full"
                />
              </div>
            </Link>

            <Link href="/profile/notifications">
              <div className="relative font-medium cursor-pointer text-gx-purple-500 group hover:text-purple-neon-500">
                {hasNew && (
                  <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-gx-purple-500 group-hover:bg-purple-neon-500"></div>
                )}
                <BellIcon className="h-12 mx-auto stroke-1" />
              </div>
            </Link>
          </>
        )}

        <Link href="/planets">
          <div className="font-medium cursor-pointer text-gx-purple-500 hover:text-purple-neon-500">
            <GlobeIcon className="h-12 mx-auto stroke-1" />
          </div>
        </Link>
      </section>

      {!authRoute && (
        <>
          <hr className="w-1/2 my-5 border-gx-purple-500/70" />

          <section className="z-10 flex flex-col items-center justify-center space-y-3">
            {user ? (
              <button
                className="w-20 px-2 py-1 text-sm uppercase rounded-md text-purplish-300 from-gx-blue-500 to-gx-purple-500 bg-gradient-to-r hover:hue-rotate-15"
                onClick={() => logout()}
              >
                Log out
              </button>
            ) : (
              <>
                <Link href="/login">
                  <button className="w-20 px-2 py-1 text-sm uppercase rounded-md text-purplish-300 from-gx-blue-500 to-gx-purple-500 bg-gradient-to-r hover:hue-rotate-15">
                    Log in
                  </button>
                </Link>
                <Link href="/register">
                  <button className="w-20 px-2 py-1 text-sm uppercase rounded-md text-purplish-300 from-gx-blue-500 to-gx-purple-500 bg-gradient-to-r hover:hue-rotate-15">
                    Register
                  </button>
                </Link>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
};
