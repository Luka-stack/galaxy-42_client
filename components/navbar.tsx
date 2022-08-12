import Image from 'next/image';
import Link from 'next/link';
import { GlobeIcon } from '@heroicons/react/outline';

import LogoImg from '../assets/black-hole_64.png';
import { useRecoilValue } from 'recoil';
import { authState } from '../lib/recoil/atoms/auth-autom';

export const Navbar = () => {
  const authUser = useRecoilValue(authState);

  return (
    <div className="flex flex-col items-center border-t border-gx-purple-500/20 shadow-md shadow-gx-purple-500 h-fit min-h-[20rem] w-32 justify-between p-2 rounded-r-lg sticky top-10">
      {/* IMG BG */}

      <div className="grid w-full grid-cols-1 place-items-center">
        <div className="relative w-16 h-16 mb-4">
          <Image src={LogoImg} alt="logo" layout="fill" />
        </div>

        <div className="font-medium cursor-pointer text-gx-purple-500 hover:text-purple-neon-500">
          <GlobeIcon className="h-10 mx-auto stroke-1" />
          Planets
        </div>
      </div>

      <div className="grid w-full grid-cols-1 place-items-center gap-y-3">
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
