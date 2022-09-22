import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CoverLoading } from '../../components/loading/cover-loading';

import { SectionSeparator } from '../../components/section-separator';
import { Topic } from '../../components/topic';
import { useAuthDispatch, useAuthState } from '../../context/auth-provider';
import { useTopics } from '../../hooks/use-topics';
import { UPDATE_USER, User, UserInput } from '../../lib/graphql/users';

type FormValues = {
  email: string;
  username: string;
  bio: string;
};

const FromSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
});

export const UserEdit = () => {
  const router = useRouter();

  const authDispatch = useAuthDispatch();
  const { user } = useAuthState();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { topics, addTopic, removeTopic, node } = useTopics();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileImageRef = useRef<HTMLImageElement>(null);

  const [updateUser, { loading, error }] = useMutation<
    {
      updateUser: User;
    },
    {
      userInput: UserInput;
    }
  >(UPDATE_USER, {
    update: (_cache, { data }) => {
      if (data) {
        authDispatch('LOGIN', data.updateUser);
        router.push('/profile');
      }
    },
  });

  const backendErrors = useMemo(() => {
    return {
      email: error?.graphQLErrors[0].extensions.email as String | null,
      username: error?.graphQLErrors[0].extensions.username as String | null,
    };
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(FromSchema) });

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.name = 'image';
      fileInputRef.current.click();
    }
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (file && profileImageRef.current) {
      profileImageRef.current.src = URL.createObjectURL(file);
      setSelectedFile(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    const { username, email, bio } = data;

    updateUser({
      variables: {
        userInput: {
          username,
          email,
          bio,
          topics: topics.join(' '),
          image: selectedFile,
        },
      },
    });
  };

  return (
    <>
      {loading && <CoverLoading title="updating..." />}

      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="file"
          hidden={true}
          ref={fileInputRef}
          onChange={handleFileInput}
        />

        <div
          className="relative w-48 h-48 border rounded-full shadow-md cursor-pointer border-gx-purple-500 shadow-purple-neon-500"
          onClick={openFileInput}
        >
          <img
            src={user!.imageUrl}
            alt="Profile Image"
            className="w-full h-full rounded-full"
            ref={profileImageRef}
          />
        </div>

        <div className="relative mt-10 w-72">
          <input
            id="username"
            type="text"
            className="w-full h-10 text-xl font-bold placeholder-transparent border-b-2 border-slate-500 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500"
            placeholder="placeholder"
            {...register('username', { value: user!.username })}
          />

          <label
            htmlFor="username"
            className="absolute left-0 -top-3.5 text-md transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
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

        <div className="relative mt-10 w-72">
          <input
            id="email"
            type="text"
            className="w-full h-10 text-xl font-bold placeholder-transparent border-b-2 border-slate-500 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500"
            placeholder="placeholder"
            {...register('email', { value: user!.email })}
          />

          <label
            htmlFor="email"
            className="absolute left-0 -top-3.5 text-md transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
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

        <section className="w-3/5">
          <SectionSeparator title="Bio" style="mt-14" />
          <div className="mx-10 mt-4">
            <textarea
              placeholder="Here, you can write something about yourself."
              {...register('bio', { value: user!.bio || '' })}
              className="w-full h-40 border-b-2 resize-none bg-bg-500 text-purplish-200 border-slate-500 focus:border-gx-purple-500 focus:outline-none"
            />
          </div>
        </section>

        <section className="w-3/5">
          <SectionSeparator title="Topics" style="mt-20" />
          <div className="flex items-end mx-10 mt-4">
            <input
              type="text"
              className="w-full h-10 font-bold border-b-2 placeholder-text-gray-400 border-slate-500 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500"
              placeholder="Provide topic or topics (separated by space)"
              ref={node}
            />
            <button
              className="h-8 px-2 py-0.5 rounded-lg text-purplish-500 bg-gx-purple-500 hover:bg-gx-purple-700 active:border-b-2 border-gx-purple-900"
              onClick={(e) => addTopic(e)}
            >
              ADD
            </button>
          </div>

          <p className="mt-1 ml-10 text-xs italic text-purplish-500">
            Topic can contain only letters and digits
          </p>

          <div className="flex flex-wrap gap-4 px-10 mt-4">
            {topics.map((topic) => (
              <Topic
                topic={topic}
                action={() => removeTopic(topic)}
                key={topic}
              />
            ))}
          </div>
        </section>

        <input
          type="submit"
          value="Update account"
          className="w-3/5 mt-20 gx-btn active:border-b-2 border-gx-purple-500"
        />
      </form>
    </>
  );
};
