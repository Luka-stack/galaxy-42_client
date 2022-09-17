import Image from 'next/image';
import Link from 'next/link';
import { BellIcon, GlobeIcon } from '@heroicons/react/outline';

import LogoImg from '../assets/black-hole_64.png';
import BGImg from '../assets/BG-Cosmo-Addons.jpg';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useAuthState } from '../context/auth-provider';
import { useRecoilValue } from 'recoil';
import { hasNewNotifications } from '../lib/recoil/atoms';

export const Navbar = () => {
  const { user } = useAuthState();
  const hasNew = useRecoilValue(hasNewNotifications);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center border-2 border-gx-purple-500/60 h-fit min-h-[20rem] w-32 justify-between p-2 rounded-r-lg fixed top-10">
      <Image src={BGImg} alt="" layout="fill" className="opacity-50 -z-50" />

      <div className="z-10 grid w-full grid-cols-1 place-items-center">
        <Link href="/">
          <div className="relative w-16 h-16 cursor-pointer mb-7 hover:scale-110 active:scale-125">
            <Image src={LogoImg} alt="logo" layout="fill" />
          </div>
        </Link>

        {user && (
          <>
            <Link href="/profile">
              <div className="relative w-10 h-10 mb-4 border border-purple-500 rounded-full shadow-md cursor-pointer hover:scale-110 active:scale-125 shadow-gx-purple-500">
                <Image
                  src={user.imageUrl}
                  alt="profile"
                  layout="fill"
                  className="rounded-full"
                />
              </div>
            </Link>
            <Link href="/profile/notifications">
              <div
                className={classNames(
                  'mb-4 font-medium cursor-pointer text-gx-purple-500 group hover:text-purple-neon-500 relative',
                  {
                    'text-purple-neon-500':
                      router.pathname === '/profile/notifications',
                  }
                )}
              >
                {hasNew && (
                  <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-gx-purple-500 group-hover:bg-purple-neon-500"></div>
                )}
                <BellIcon className="h-10 mx-auto stroke-1" />
              </div>
            </Link>
          </>
        )}

        <Link href="/planets">
          <div
            className={classNames(
              'mb-4 font-medium cursor-pointer text-gx-purple-500 hover:text-purple-neon-500',
              { 'text-purple-neon-500': router.pathname === '/planets' }
            )}
          >
            <GlobeIcon className="h-10 mx-auto stroke-1" />
          </div>
        </Link>
      </div>

      <div className="z-10 grid w-full grid-cols-1 mt-4 place-items-center gap-y-3">
        {user ? (
          <button className="w-24 px-2 py-1 uppercase rounded-md text-purplish-300 from-gx-blue-500 to-gx-purple-500 bg-gradient-to-r hover:hue-rotate-15">
            Log out
          </button>
        ) : (
          <>
            <Link href="/login">
              <button className="w-24 px-2 py-1 uppercase rounded-md text-purplish-300 from-gx-blue-500 to-gx-purple-500 bg-gradient-to-r hover:hue-rotate-15">
                Log in
              </button>
            </Link>
            <Link href="/register">
              <button className="w-24 px-2 py-1 uppercase rounded-md text-purplish-300 from-gx-blue-500 to-gx-purple-500 bg-gradient-to-r hover:hue-rotate-15">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
