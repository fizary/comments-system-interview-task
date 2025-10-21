import Head from "next/head";
import { wrapper } from "@/store";
import { api } from "@/services";
import {
  EnhancedCommentsTable,
  COMMENTS_LIMIT_FILTER,
} from "@/components/enhanced-comments-table";
import { CreateCommentDialog } from "@/components/comments-dialogs";

// Investigate possibility of store leaking to other requests (as mentiened here https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering)
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(
      api.endpoints.getComments.initiate({ limit: COMMENTS_LIMIT_FILTER })
    );
    await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

    return { props: {} };
  }
);

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
          <EnhancedCommentsTable />
          <CreateCommentDialog />
        </div>
      </main>
    </>
  );
}
