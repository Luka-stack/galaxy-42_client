import { FormEvent, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next/types';
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';

import BgImage from '../assets/Bg-Cosmo-5.jpg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  emailValidation,
  emptyValidation,
  passwordValidation,
} from '../utils/validations';

const Register: NextPage = () => {
  const router = useRouter();

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const email = useRef<any>(null);
  const username = useRef<any>(null);
  const password = useRef<any>(null);
  const confirmation = useRef<any>(null);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const emailInput: HTMLInputElement = email.current;
    const usernameInput: HTMLInputElement = username.current;
    const passwordInput: HTMLInputElement = password.current;
    const confirmationInput: HTMLInputElement = confirmation.current;

    if (emailInput) {
      const error = emailValidation(emailInput.value);
      emailInput.setCustomValidity(error);
      setEmailError(error);
    }

    if (usernameInput) {
      const error = emptyValidation(usernameInput.value);
      usernameInput.setCustomValidity(error);
      setUsernameError(error);
    }

    if (passwordInput) {
      const error = passwordValidation(
        passwordInput.value,
        confirmationInput.value
      );
      passwordInput.setCustomValidity(error);
      confirmationInput.setCustomValidity(error);
      setPasswordError(error);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen">
      <Head>
        <title>Galaxy 42 Registration</title>
      </Head>

      {/* Image BG */}
      <Image src={BgImage} alt="bg" layout="fill" className="opacity-75" />
      {/* Image Logo */}

      <div className="relative flex flex-col items-center w-1/2 p-4 mx-auto my-auto rounded-md shadow-md h-fit bg-bg-500 shadow-gx-purple-500">
        <div
          className="absolute flex items-center text-xl font-bold cursor-pointer top-2 left-2 text-gx-purple-500 hover:text-purple-neon-500"
          onClick={() => router.back()}
        >
          <ArrowNarrowLeftIcon className="w-10 h-10 mr-2 stroke-2" />
          Back
        </div>

        <h1 className="my-10 text-2xl font-extrabold leading-10 text-gx-purple-500">
          Registration
        </h1>

        <form
          className="flex flex-col space-y-10 w-72"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="relative">
            <input
              id="email"
              name="email"
              type="text"
              className="w-full h-10 placeholder-transparent border-b-2 border-slate-500 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500 invalid:border-pink-500 focus:invalid:border-pink-500"
              placeholder="placeholder"
              ref={email}
            />

            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
            >
              Email address
            </label>
            <p className="hidden mt-2 text-xs italic text-pink-500 peer-invalid:block">
              {emailError}
            </p>
          </div>
          <div className="relative">
            <input
              id="username"
              name="username"
              type="text"
              className="w-full h-10 placeholder-transparent border-b-2 border-slate-400 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500 placeholder-shown:border-slate-500 invalid:border-pink-500 focus:invalid:border-pink-500"
              placeholder="placeholder"
              ref={username}
            />
            <label
              htmlFor="username"
              className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
            >
              Username
            </label>
            <p className="hidden mt-2 text-xs italic text-pink-500 peer-invalid:block">
              {usernameError}
            </p>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              className="w-full h-10 placeholder-transparent border-b-2 border-slate-400 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500 placeholder-shown:border-slate-500 invalid:border-pink-500 focus:invalid:border-pink-500"
              placeholder="placeholder"
              ref={password}
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
            >
              Password
            </label>
            <p className="hidden mt-2 text-xs italic text-pink-500 peer-invalid:block">
              {passwordError}
            </p>
          </div>
          <div className="relative">
            <input
              id="confirmation"
              name="confirmation"
              type="password"
              className="w-full h-10 placeholder-transparent border-b-2 border-slate-400 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500 placeholder-shown:border-slate-500 invalid:border-pink-500 focus:invalid:border-pink-500"
              placeholder="placeholder"
              ref={confirmation}
            />
            <label
              htmlFor="confirmation"
              className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
            >
              Password Confirmation
            </label>
          </div>

          <input
            className="px-2 py-1 rounded-md cursor-pointer text-purplish-300 from-gx-blue-500 to-gx-purple-500 bg-gradient-to-r hover:hue-rotate-15"
            type="submit"
            value="Create Account"
          />
        </form>

        <p className="mt-4 text-gx-purple-500">
          Already have account? You can log{' '}
          <Link href="/login">
            <span className="font-bold underline cursor-pointer text-purple-neon-500 underline-offset-4 hover:text-lg">
              here!
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
