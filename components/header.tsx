import Link from 'next/link';
import Image from 'next/image';

import LogoImg from '../assets/black-hole_64.png';
import { BellIcon, GlobeIcon } from '@heroicons/react/outline';
import BGImg from '../assets/BG-Cosmo-Addons.jpg';

export const Header = () => {
  return (
    <div className="relative flex flex-col items-center justify-center flex-none w-24 h-screen border-r border-gx-purple-500">
      <Image src={BGImg} alt="" layout="fill" className="opacity-50 -z-50" />

      <section className="absolute top-0">
        <Link href="/">
          <div className="relative self-start w-20 h-20 cursor-pointer mb-7 justify-self-start">
            <Image src={LogoImg} alt="logo" layout="fill" />
          </div>
        </Link>
      </section>

      <section className="flex flex-col items-center justify-center space-y-4">
        {/* <main> */}
        <Link href="/profile">
          <div className="relative w-12 h-12 border border-purple-500 rounded-full cursor-pointer hover:scale-110 active:scale-125">
            <Image
              src={LogoImg} // TODO ADD user profile image
              alt="profile"
              layout="fill"
              className="rounded-full"
            />
          </div>
        </Link>

        {/* TODO look navbar*/}
        <Link href="/profile/notifications">
          <div className="relative font-medium cursor-pointer text-gx-purple-500 group hover:text-purple-neon-500">
            <BellIcon className="h-12 mx-auto stroke-1" />
          </div>
        </Link>

        <Link href="/planets">
          <div className="font-medium cursor-pointer text-gx-purple-500 hover:text-purple-neon-500">
            <GlobeIcon className="h-12 mx-auto stroke-1" />
          </div>
        </Link>
      </section>

      <hr className="w-1/2 my-5 border-gx-purple-500/70" />

      <section className="flex flex-col items-center justify-center space-y-3">
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
      </section>
    </div>
  );
};
