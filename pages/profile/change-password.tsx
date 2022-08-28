import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { NextPage } from 'next/types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmation: string;
};

const FormSchema = yup.object().shape({
  oldPassword: yup.string().required('OldPassword is required'),
  newPassword: yup
    .string()
    .matches(
      /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
      'Minimum 6 characters\nAt least 1 upper case English letter\nAt least 1 lower case English letter\nAt least 1 letter\nAt least 1 special character'
    )
    .required('New password is required'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'New passwords must match'),
});

const ChangePasswordPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(FormSchema) });

  const onSubmit = (data: FormValues) => {
    // const { oldPassword, newPassword, confirmation } = data;

    console.log(data);
  };

  return (
    <div className="my-10 ml-32">
      <Head>
        <title>Password | Galaxy 42</title>
      </Head>

      <main className="grid justify-center grid-cols-1 place-items-center">
        <h1 className="mb-10 text-3xl font-bold text-gx-purple-500">
          New password
        </h1>
        <form
          className="flex flex-col space-y-10 w-72"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <input
              id="oldPassword"
              type="password"
              className="w-full h-10 placeholder-transparent border-b-2 border-slate-400 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500 placeholder-shown:border-slate-500"
              placeholder="placeholder"
              {...register('oldPassword')}
            />
            <label
              htmlFor="oldPassword"
              className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
            >
              Old password
            </label>
            {errors.oldPassword && (
              <p className="mt-2 text-xs text-pink-500 whitespace-pre">
                {errors.oldPassword.message}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              id="newPassword"
              type="password"
              className="w-full h-10 placeholder-transparent border-b-2 border-slate-400 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500 placeholder-shown:border-slate-500"
              placeholder="placeholder"
              {...register('newPassword')}
            />
            <label
              htmlFor="newPassword"
              className="absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
            >
              New password
            </label>
            {errors.newPassword && (
              <p className="mt-2 text-xs text-pink-500 whitespace-pre">
                {errors.newPassword.message}
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
              Password confirmation
            </label>
            {errors.confirmation && (
              <p className="mt-2 text-xs text-pink-500 whitespace-pre">
                {errors.confirmation.message}
              </p>
            )}
          </div>

          <input
            type="submit"
            value="Save Password"
            className="gx-btn active:border-b-2 border-gx-purple-500-"
          />
        </form>
      </main>
    </div>
  );
};

export default ChangePasswordPage;
