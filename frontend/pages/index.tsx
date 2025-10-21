import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Comments</title>
        <meta
          name="description"
          content="View, edit, and delete comments posted by users."
        />
      </Head>
      <main className="min-h-screen flex items-center justify-center p-5">
        <div className="flex flex-col gap-10 w-full max-w-5xl">
          <h1 className="text-4xl text-center">Comments</h1>
        </div>
      </main>
    </>
  );
}
