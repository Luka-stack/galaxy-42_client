import Head from 'next/head';
import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';

import { initializeApollo } from '../../lib/apollo';
import { GET_USER, GET_USERS, User } from '../../lib/graphql/users';
import { UserDetails } from '../../features/users/user-details';
import { CoverLoading } from '../../components/loading/cover-loading';

interface StaticProps {
  params: { username: string | undefined };
}

interface PageProps {
  user?: User;
}

const client = initializeApollo();

const UserProfile: NextPage<PageProps> = ({ user }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <CoverLoading title={'loading...'} />;
  }

  if (!user) {
    router.replace('/404');
    return null;
  }

  return (
    <div className="h-screen mt-10 ml-32">
      <Head>
        <title>{user.username} | Galaxy 42</title>
      </Head>

      <UserDetails user={user} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const {
    data: { users },
  } = await client.query<{ users: User[] }>({ query: GET_USERS });
  const usernames = users?.map((user) => user.username);
  const paths = usernames?.map((username) => ({ params: { username } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { username } }: StaticProps) => {
  if (!username) {
    throw new Error('Parameter is invalid');
  }

  try {
    const {
      data: { getUser: user },
    } = await client.query({ query: GET_USER, variables: { username } });

    return {
      props: {
        user,
      },
      revalidate: 60,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default UserProfile;
