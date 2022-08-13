import Image from 'next/image';
import Link from 'next/link';
import { GlobeIcon } from '@heroicons/react/outline';
import { useRecoilValue } from 'recoil';

import LogoImg from '../assets/black-hole_64.png';
import ProfileImg from '../assets/profile.jpg';
import { authState } from '../lib/recoil/atoms/auth-autom';

export const Navbar = () => {
  const authUser = useRecoilValue(authState);

  return (
    <div className="flex flex-col items-center border-t border-gx-purple-500/20 shadow-md shadow-gx-purple-500 h-fit min-h-[20rem] w-32 justify-between p-2 rounded-r-lg fixed top-10">
      {/* IMG BG */}

      <div className="grid w-full grid-cols-1 place-items-center">
        <Link href="/">
          <div className="relative w-16 h-16 cursor-pointer mb-7 hover:scale-110 active:scale-125">
            <Image src={LogoImg} alt="logo" layout="fill" />
          </div>
        </Link>

        {authUser && (
          <Link href="/profile">
            <div className="relative w-10 h-10 mb-4 border border-purple-500 rounded-full shadow-md cursor-pointer hover:scale-110 active:scale-125 shadow-gx-purple-500">
              <Image
                src={ProfileImg}
                alt="profile"
                layout="fill"
                className="rounded-full"
              />
            </div>
          </Link>
        )}

        <div className="mb-4 font-medium cursor-pointer text-gx-purple-500 hover:text-purple-neon-500">
          <GlobeIcon className="h-10 mx-auto stroke-1" />
          Planets
        </div>
      </div>

      <div className="grid w-full grid-cols-1 mt-4 place-items-center gap-y-3">
        {authUser ? (
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
