import Image from 'next/image';

import BlackHoleImg from '../assets/black-hole_256.png';
import CosmoBg from '../assets/BG-Cosmo-Banner.png';

export const Jumbotron = () => {
  return (
    <div className="relative flex items-center justify-between p-5 border rounded-lg shadow-sm shadow-gx-purple-500 border-gx-purple-500/30 h-fit">
      <Image
        src={CosmoBg}
        layout="fill"
        alt="CosmoBg"
        className="absolute opacity-40 -z-50"
      />

      <div className="z-10 flex flex-col h-full">
        <h1 className="mb-4 text-3xl font-bold leading-10 text-gx-purple-500">
          Stay Connected.
        </h1>
        <p className="w-3/4 tracking-wide text-purplish-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ratione
          excepturi quidem quod officia magnam earum ipsum ipsam reiciendis
          numquam nisi, sint sequi iusto cumque temporibus quisquam ullam.
          Repudiandae, corrupti.
        </p>
        <button className="w-48 py-1 mt-8 font-bold border-transparent rounded-lg shadow-sm cursor-pointer shadow-white/60 bg-gradient-to-r from-gx-blue-500 to-gx-purple-500 text-purplish-300 hover:shadow-purple-neon-500 hover:shadow-md hover:hue-rotate-15 active:scale-105">
          Join Right Now
        </button>
      </div>
      <div className="hidden w-72 lg:block">
        <Image src={BlackHoleImg} layout="fixed" alt="galaxy 42 logo" />
      </div>
    </div>
  );
};
