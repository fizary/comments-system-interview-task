import type { ApiBuilder, ApiResponse } from "@/types/api";
import type {
  Comment,
  CreateCommentPayload,
  UpdateCommentPayload,
} from "@/types/comment";

export function createCommentEndpoints(builder: ApiBuilder) {
  return {
    getComments: builder.query<
      ApiResponse<Comment[]>,
      { limit?: number; offset?: number }
    >({
      query: (args) => {
        const filters = new URLSearchParams();

        for (const [k, v] of Object.entries(args))
          if (v) filters.set(k, String(v));

        return `comments?${filters.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              "comments",
              ...result.data.map((comment) => ({
                type: "comments",
                id: comment.id,
              })),
            ]
          : ["comments"],
    }),
    getComment: builder.query<ApiResponse<Comment>, number>({
      query: (id) => `comments/${id}`,
      providesTags: (result, error, id) => [{ type: "comments", id }],
    }),
    createComment: builder.mutation<ApiResponse<Comment>, CreateCommentPayload>(
      {
        query: (payload) => ({
          url: `comments`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: () => ["comments"],
      }
    ),
    updateComment: builder.mutation<ApiResponse<Comment>, UpdateCommentPayload>(
      {
        query: ({ id, ...payload }) => ({
          url: `comments/${id}`,
          method: "PUT",
          body: payload,
        }),
        invalidatesTags: (result, error, args) => [
          { type: "comments", id: args.id },
        ],
      }
    ),
    deleteComment: builder.mutation<ApiResponse<Comment>, number>({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "comments", id }],
    }),
  };
}
