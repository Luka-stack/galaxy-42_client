import * as yup from 'yup';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import type { NextPage } from 'next/types';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';

import { LOGIN_USER, ME } from '../lib/graphql/users';
import { CoverLoading } from '../components/loading/cover-loading';
import { setJwtToken } from '../lib/access-token';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(FormSchema) });

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    refetchQueries: [ME],
    awaitRefetchQueries: true,
    update: (_cache, { data }) => {
      setJwtToken(data.login.accessToken);
      router.push((router.query.returnUrl as string) || '/');
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
    <div className="flex items-center justify-center w-full">
      <Head>
        <title>Galaxy 42 Login</title>
      </Head>

      {loading && <CoverLoading title="loging..." />}

      <div className="relative flex flex-col justify-center items-center w-[27rem] p-4 mx-auto my-auto rounded-md h-fit bg-bg-500 min-h-[25rem] border border-gx-purple-500">
        <h1 className="mb-10 text-2xl font-extrabold leading-10 text-gx-purple-500">
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
