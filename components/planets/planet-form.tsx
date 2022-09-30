import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { ApolloError } from '@apollo/client';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

import { Topic } from '../topic';
import { Planet, PlanetInput } from '../../lib/graphql/planets';
import { useTopics } from '../../hooks/use-topics';
import { SectionSeparator } from '../section-separator';

interface Props {
  planet?: Planet;
  setVariables: (planet: PlanetInput) => void;
  loading: boolean;
  error: ApolloError | undefined;
}

type FormValues = {
  name: string;
  bio: string;
  requirements: string;
};

const FormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  bio: yup
    .string()
    .min(20, 'Has to be at least 50 characters')
    .required('Bio is required'),
  requirements: yup
    .string()
    .min(20, 'Has to be at least 20 characters')
    .required('Requirements are required'),
});

export const PlanetForm = ({ planet, setVariables, loading, error }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLImageElement>(null);

  const {
    topics,
    setTopics,
    addTopic,
    removeTopic,
    node: topicNode,
  } = useTopics();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(FormSchema) });

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.name = 'image';
      fileInputRef.current.click();
    }
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (file && bannerRef.current) {
      bannerRef.current.src = URL.createObjectURL(file);
      setSelectedFile(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (!topics.length) return;

    const { name, bio, requirements } = data;

    setVariables({
      name,
      bio,
      requirements,
      isPublic,
      topics: topics.join(' '),
      image: selectedFile,
    });
  };

  useEffect(() => {
    if (planet) {
      reset({
        name: planet.name,
        bio: planet.bio,
        requirements: planet.requirements,
      });

      setIsPublic(planet.isPublic);
      setTopics(planet.topics.split(' '));
    }
  }, [planet]);

  return (
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
        className="relative w-4/5 border rounded-lg shadow-md cursor-pointer h-80 border-gx-purple-500 shadow-purple-neon-500"
        onClick={openFileInput}
      >
        <img
          ref={bannerRef}
          src={planet ? planet.imageUrl : ''}
          alt="Click to set up image"
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="relative mt-10 w-72">
        <input
          id="name"
          type="text"
          className="w-full h-10 text-xl font-bold placeholder-transparent border-b-2 border-slate-500 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500"
          placeholder="placeholder"
          {...register('name')}
        />

        <label
          htmlFor="name"
          className="absolute left-0 -top-3.5 text-md transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-300 peer-focus:text-sm text-gray-400"
        >
          Planet Name
        </label>
        {errors.name && (
          <p className="mt-2 text-sm italic text-pink-500">
            {errors.name.message}
          </p>
        )}
        {error && (
          <p className="mt-2 text-sm italic text-pink-500">{error.message}</p>
        )}
      </div>

      <div className="relative w-3/5 mt-12">
        <h3 className="mb-4 text-2xl font-bold text-center text-gx-purple-500">
          {"Planet's Visibility"}
        </h3>
        <div className="flex justify-center space-x-16">
          <div
            onClick={() => setIsPublic(true)}
            className={classNames(
              'p-2 border-2 cursor-pointer rounded-xl w-72 border-gx-purple-500/30',
              { '!border-gx-purple-500': isPublic }
            )}
          >
            <EyeIcon className="w-8 text-gx-purple-500" />
            <h4 className="mt-2 text-lg font-bold text-purplish-500">Public</h4>
            <p className="text-purplish-500">
              Public planets are visible to everyone. Users can send joining
              requests.
            </p>
          </div>
          <div
            onClick={() => setIsPublic(false)}
            className={classNames(
              'p-2 border-2 cursor-pointer rounded-xl w-72 border-gx-purple-500/30',
              { '!border-gx-purple-500': !isPublic }
            )}
          >
            <EyeOffIcon className="w-8 text-gx-purple-500" />
            <h4 className="mt-2 text-lg font-bold text-purplish-500">
              Private
            </h4>
            <p className="text-purplish-500">
              Private planets are not visible to users. Only Planet&apos;s admin
              can send an invitation.
            </p>
          </div>
        </div>
      </div>

      <section className="w-3/5">
        <SectionSeparator title="Bio" style="mt-14" />
        <div className="mx-10 mt-4">
          <textarea
            placeholder="Here, you can write something about your planet."
            {...register('bio')}
            className="w-full h-40 border-b-2 resize-none bg-bg-500 text-purplish-200 border-slate-500 focus:border-gx-purple-500 focus:outline-none"
          />
          {errors.bio && (
            <p className="mt-2 text-sm italic text-pink-500">
              {errors.bio.message}
            </p>
          )}
        </div>
      </section>

      <section className="w-3/5">
        <SectionSeparator title="Requirements" style="mt-14" />
        <div className="mx-10 mt-4">
          <textarea
            placeholder="Here, you can write about the requirements to join your planet"
            {...register('requirements')}
            className="w-full h-40 border-b-2 resize-none bg-bg-500 text-purplish-200 border-slate-500 focus:border-gx-purple-500 focus:outline-none"
          />
          {errors.requirements && (
            <p className="mt-2 text-sm italic text-pink-500">
              {errors.requirements.message}
            </p>
          )}
        </div>
      </section>

      <section className="w-3/5">
        <SectionSeparator title="Topics" style="mt-20" />
        <div className="flex items-end mx-10 mt-4">
          <input
            type="text"
            className="w-full h-10 font-bold border-b-2 placeholder-text-gray-400 border-slate-500 text-purplish-200 peer focus:outline-none focus:border-gx-purple-500 bg-bg-500"
            placeholder="Provide topic or topics (separated by space)"
            ref={topicNode}
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
        {!topics.length && (
          <p className="mt-1 ml-10 text-sm italic text-pink-500">
            At least one topic is required
          </p>
        )}

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
        value="Save Planet"
        className="w-3/5 mt-20 gx-btn active:border-b-2 border-gx-purple-500"
      />
    </form>
  );
};
