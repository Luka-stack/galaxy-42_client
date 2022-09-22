import * as yup from 'yup';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import type { NextPage } from 'next/types';
import { useLazyQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';

import BgImage from '../assets/Bg-Cosmo-5.jpg';
import { LOGIN_USER } from '../lib/graphql/users';
import { useAuthDispatch } from '../context/auth-provider';
import { CoverLoading } from '../components/loading/cover-loading';

type FormValues = {
  email: string;
  password: string;
};

const FormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useAuthDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(FormSchema) });

  const [login, { loading, error }] = useLazyQuery(LOGIN_USER, {
    onCompleted: ({ login }) => {
      dispatch('LOGIN', login);
      router.back();
    },
  });

  const onSubmit = (data: FormValues) => {
    const { email, password } = data;

    login({
      variables: {
        login: {
          email,
          password,
        },
      },
    });
  };

  return (
    <div className="relative flex items-center justify-center h-screen">
      <Head>
        <title>Galaxy 42 Login</title>
      </Head>

      <Image src={BgImage} alt="bg" layout="fill" className="opacity-75" />

      {loading && <CoverLoading title="loging..." />}

      <div className="relative flex flex-col items-center w-[27rem] p-4 mx-auto my-auto rounded-md shadow-md h-fit bg-bg-500 shadow-gx-purple-500 min-h-[28rem]">
        <div
          className="absolute flex items-center text-xl font-bold cursor-pointer top-2 left-2 text-gx-purple-500 hover:text-purple-neon-500"
          onClick={() => router.back()}
        >
          <ArrowNarrowLeftIcon className="w-10 h-10 mr-2 stroke-2" />
          Back
        </div>

        <h1 className="my-10 text-2xl font-extrabold leading-10 text-gx-purple-500">
          Welcome Back
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
            {error && (
              <p className="mt-2 text-xs italic text-pink-500">
                {error.message}
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
              <p className="mt-2 text-xs italic text-pink-500">
                {errors.password.message}
              </p>
            )}
            {error && (
              <p className="mt-2 text-xs italic text-pink-500">
                {error.message}
              </p>
            )}
          </div>

          <input
            className="px-2 py-1 rounded-md cursor-pointer text-purplish-300 from-gx-blue-500 to-gx-purple-500 bg-gradient-to-r hover:hue-rotate-15"
            type="submit"
            value="Log In"
          />
        </form>

        <p className="mt-4 text-gx-purple-500">
          {"Don't have an account yet? Register "}
          <Link href="/register">
            <span className="font-bold underline cursor-pointer text-purple-neon-500 underline-offset-4 hover:text-lg">
              here!
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
