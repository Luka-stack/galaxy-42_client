import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next/types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ProfileImg from '../../assets/profile.jpg';
import { SectionSeparator } from '../../components/section-separator';
import { useForm } from 'react-hook-form';
import { useMemo, useRef, useState } from 'react';
import { arrayUnique } from '../../utils/validations';
import { Topic } from '../../components/topic';
import { UPDATE_USER, User, UserInput } from '../../lib/graphql/users';
import { useMutation } from '@apollo/client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../lib/recoil/atoms/auth-autom';

const topicRegex = /^[A-Z0-9 ]*$/i;

type FormValues = {
  email: string;
  username: string;
  bio: string;
};

const FromSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
});

const EditProfile: NextPage = () => {
  const setAuthUser = useSetRecoilState(authState);
  const authUser = useRecoilValue(authState);

  const topicRef = useRef<any>(null);
  const [topics, setTopics] = useState<string[]>([]);

  const [updateUser, { loading, error }] = useMutation<
    { updateUser: User },
    { userId: String; user: UserInput }
  >(UPDATE_USER, {
    update: (_cache, { data }) => {
      if (data) {
        setAuthUser(data.updateUser);
      }
    },
    onError: (_) => {},
  });

  //   const backendErrors = useMemo(() => {
  //     return {
  //       email: error?.graphQLErrors[0].extensions.email as String | null,
  //       username: error?.graphQLErrors[0].extensions.username as String | null,
  //     };
  //   }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(FromSchema) });

  const addTopic = (e: any) => {
    e.preventDefault();
    const topic: HTMLInputElement = topicRef.current;

    if (topic && topic.value) {
      if (!topicRegex.test(topic.value)) {
        return;
      }

      const newTopics = topic.value
        .trim()
        .split(' ')
        .map((topic) => topic.toLowerCase().trim());
      setTopics(arrayUnique(topics.concat(newTopics)));

      topic.value = '';
    }
  };

  const removeTopic = (topic: string) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  const onSubmit = (data: FormValues) => {
    const { username, email, bio } = data;

    updateUser({
      variables: {
        userId: authUser!.uuid,
        user: {
          //   username,
          //   email,

          // @ts-ignore
          bio,
          topics: topics.join(' '),
        },
      },
    });
  };

  return (
    <div className="mt-10 mb-10 ml-32">
      <Head>
        <title>Takacchi | Galaxy 42</title>
      </Head>

      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative w-48 h-48 border rounded-full shadow-md border-gx-purple-500 shadow-purple-neon-500">
          <Image
            src={ProfileImg}
            alt="Profile Image"
            layout="fill"
            className="rounded-full"
          />
        </div>

        <div className="relative mt-10 w-72">
          <input
            id="username"
            type="text"
            className="w-full h-10 text-xl font-bold placeholder-transparent border-b-2 border-slate-500 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500"
            placeholder="placeholder"
            {...register('username', { value: authUser!.username })}
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
          {/* {backendErrors.username && (
            <p className="mt-2 text-xs italic text-pink-500">
              {backendErrors.username}
            </p>
          )} */}
        </div>

        <div className="relative mt-10 w-72">
          <input
            id="email"
            type="text"
            className="w-full h-10 text-xl font-bold placeholder-transparent border-b-2 border-slate-500 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500"
            placeholder="placeholder"
            {...register('email', { value: authUser!.email })}
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
          {/* {backendErrors.email && (
            <p className="mt-2 text-xs italic text-pink-500">
              {backendErrors.email}
            </p>
          )} */}
        </div>

        <section className="w-3/5">
          <SectionSeparator title="Bio" style="mt-14" />
          <div className="mx-10 mt-4">
            <textarea
              placeholder="Here, you can write something about yourself."
              {...register('bio', { value: authUser!.bio || '' })}
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
              ref={topicRef}
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
    </div>
  );
};

export default EditProfile;
