import Head from "next/head";
import { wrapper } from "@/store";
import { api } from "@/services";
import { COMMENTS_PER_PAGE } from "@/constants";
import { EnhancedCommentsTable } from "@/components/enhanced-comments-table";
import { CreateCommentDialog } from "@/components/comments-dialogs";
import {
  convertPageStringToInteger,
  getPaginationFilters,
} from "@/components/pagination";

// Investigate possibility of store leaking to other requests (as mentiened here https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering)
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (req) => {
    const currentPage = convertPageStringToInteger(
      Array.isArray(req.query.page) ? req.query.page[0] : req.query.page
    );
    const paginationFilters = getPaginationFilters(
      currentPage,
      COMMENTS_PER_PAGE
    );
    store.dispatch(api.endpoints.getComments.initiate(paginationFilters));
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
