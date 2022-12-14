import * as yup from 'yup';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';

import { RegisterInput, REGISTER_USER, User } from '../lib/graphql/users';
import { CoverLoading } from '../components/loading/cover-loading';

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
    update: () => router.replace('/login'),
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
    <div className="flex items-center justify-center w-full">
      <Head>
        <title>Galaxy 42 Registration</title>
      </Head>

      {loading && <CoverLoading title="registering..." />}

      <main className="relative flex flex-col items-center w-1/2 p-4 mx-auto my-auto rounded-md h-fit bg-bg-500 border border-gx-purple-500 min-h-[30rem]">
        <h1 className="mb-10 text-2xl font-extrabold leading-10 text-gx-purple-500">
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
              <p className="mt-2 text-xs text-pink-500">
                {errors.email.message}
              </p>
            )}
            {backendErrors.email && (
              <p className="mt-2 text-xs text-pink-500">
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
              <p className="mt-2 text-xs text-pink-500">
                {errors.username.message}
              </p>
            )}
            {backendErrors.username && (
              <p className="mt-2 text-xs text-pink-500">
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
              <p className="mt-2 text-xs text-pink-500 whitespace-pre">
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
              <p className="mt-2 text-xs text-pink-500 whitespace-pre">
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
      </main>
    </div>
  );
};

export default Register;
