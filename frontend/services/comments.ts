import type { CustomEndpointBuilder, ApiResponse } from "@/types/api";
import type {
  Comment,
  CommentsFilters,
  CreateCommentPayload,
  UpdateCommentPayload,
} from "@/types/comment";

// RTK Query does not have normalized cache, so it is excessively hard to optimize manual updates and invalidation
export function createCommentEndpoints(builder: CustomEndpointBuilder) {
  return {
    getComments: builder.query<ApiResponse<Comment[]>, CommentsFilters>({
      query: (args) => {
        const filters = new URLSearchParams();

        for (const [k, v] of Object.entries(args))
          if (v) filters.set(k, String(v));

        return `comments?${filters.toString()}`;
      },
      providesTags: ["comments"],
    }),
    getComment: builder.query<ApiResponse<Comment>, number>({
      query: (id) => `comments/${id}`,
      providesTags: ["comments"],
    }),
    createComment: builder.mutation<ApiResponse<Comment>, CreateCommentPayload>(
      {
        query: (payload) => ({
          url: `comments`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: (_, error) => (!error ? ["comments"] : []),
      }
    ),
    updateComment: builder.mutation<ApiResponse<Comment>, UpdateCommentPayload>(
      {
        query: ({ id, ...payload }) => ({
          url: `comments/${id}`,
          method: "PUT",
          body: payload,
        }),
        invalidatesTags: (_, error) => (!error ? ["comments"] : []),
      }
    ),
    deleteComment: builder.mutation<ApiResponse<Comment>, number>({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error) => (!error ? ["comments"] : []),
    }),
  };
}
