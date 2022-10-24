import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { NextPage } from 'next';

import RocketImg from '../assets/rocket.png';

const FourOhFour: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Oops! Are you lost?</title>
      </Head>

      <div className="absolute moving-planet">
        <Image src={RocketImg} layout="fixed" alt="galaxy 42 logo" />
      </div>

      <main className="flex flex-col w-full pt-10 pl-60 text-purplish-500">
        <h1 className="font-bold text-8xl">404</h1>
        <h2 className="text-3xl font-semibold">Are you lost in space?</h2>
        <Link href="/">
          <button className="p-1 mt-10 text-white rounded-lg shadow-lg w-28 bg-gx-purple-500">
            Go back home
          </button>
        </Link>
      </main>
    </div>
  );
};

export default FourOhFour;
