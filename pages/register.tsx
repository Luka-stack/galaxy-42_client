import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import type { NextPage } from 'next/types';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';

import BgImage from '../assets/Bg-Cosmo-5.jpg';
import { RegisterInput, REGISTER_USER, User } from '../lib/graphql/users';
import { useRecoilValue } from 'recoil';
import { authState } from '../lib/recoil/atoms/auth-atom';

type FormValues = {
  email: string;
  username: string;
  password: string;
  confirmation: string;
};

const FormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .matches(
      /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
      'Minimum 6 characters\nAt least 1 upper case English letter\nAt least 1 lower case English letter\nAt least 1 letter\nAt least 1 special character'
    )
    .required('Password is required'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(FormSchema) });

  const [registerUser, { loading, error }] = useMutation<{
    register: RegisterInput;
    user: User;
  }>(REGISTER_USER, {
    update: (_, __) => router.replace('/login'),
    onError: (_) => {},
  });

  const backendErrors = useMemo(() => {
    return {
      email: error?.graphQLErrors[0].extensions.email as String | null,
      username: error?.graphQLErrors[0].extensions.username as String | null,
    };
  }, [error]);

  const onSubmit = (data: FormValues) => {
    const { username, password, email } = data;

    registerUser({
      variables: {
        user: {
          username,
          password,
          email,
        },
      },
    });
  };

  return (
    <div className="relative flex items-center justify-center h-screen">
      <Head>
        <title>Galaxy 42 Registration</title>
      </Head>

      {/* Image BG */}
      <Image src={BgImage} alt="bg" layout="fill" className="opacity-75" />
      {/* Image Logo */}

      <div className="relative flex flex-col items-center w-1/2 p-4 mx-auto my-auto rounded-md shadow-md h-fit bg-bg-500 shadow-gx-purple-500 min-h-[30rem]">
        {loading ? (
          <div className="flex h-20 my-auto space-x-5">
            <div className="flex items-center justify-center space-x-2 loading-ball-one animate-bounce">
              <div className="w-8 h-8 rounded-full bg-gx-purple-500"></div>
            </div>
            <div className="flex items-center justify-center space-x-2 loading-ball-two animate-bounce">
              <div className="w-8 h-8 rounded-full bg-gx-purple-700"></div>
            </div>
            <div className="flex items-center justify-center space-x-2 loading-ball-three animate-bounce">
              <div className="w-8 h-8 rounded-full bg-gx-purple-900"></div>
            </div>
          </div>
        ) : (
          <>
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
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="relative">
                <input
                  id="email"
                  type="text"
                  className="w-full h-10 placeholder-transparent border-b-2 border-slate-500 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500"
                  placeholder="placeholder"
                  {...register('email')}
                />

                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
                >
                  Email address
                </label>
                {errors.email && (
                  <p className="mt-2 text-xs italic text-pink-500">
                    {errors.email.message}
                  </p>
                )}
                {backendErrors.email && (
                  <p className="mt-2 text-xs italic text-pink-500">
                    {backendErrors.email}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  className="w-full h-10 placeholder-transparent border-b-2 border-slate-400 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500 placeholder-shown:border-slate-500"
                  placeholder="placeholder"
                  {...register('username')}
                />
                <label
                  htmlFor="username"
                  className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
                >
                  Username
                </label>
                {errors.username && (
                  <p className="mt-2 text-xs italic text-pink-500">
                    {errors.username.message}
                  </p>
                )}
                {backendErrors.username && (
                  <p className="mt-2 text-xs italic text-pink-500">
                    {backendErrors.username}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  className="w-full h-10 placeholder-transparent border-b-2 border-slate-400 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500 placeholder-shown:border-slate-500"
                  placeholder="placeholder"
                  {...register('password')}
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
                >
                  Password
                </label>
                {errors.password && (
                  <p className="mt-2 text-xs italic text-pink-500 whitespace-pre">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  id="confirmation"
                  type="password"
                  className="w-full h-10 placeholder-transparent border-b-2 border-slate-400 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500 placeholder-shown:border-slate-500"
                  placeholder="placeholder"
                  {...register('confirmation')}
                />
                <label
                  htmlFor="confirmation"
                  className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
                >
                  Password Confirmation
                </label>
                {errors.confirmation && (
                  <p className="mt-2 text-xs italic text-pink-500 whitespace-pre">
                    {errors.confirmation.message}
                  </p>
                )}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
