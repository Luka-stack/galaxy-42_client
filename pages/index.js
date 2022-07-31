import Head from 'next/head';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Galaxy 42</title>
        <meta
          name="description"
          content="Galaxy 42 is a place where you can connect with people"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-2xl text-red-500 font-bold">Hello to Galaxy 42</h1>
    </div>
  );
}
