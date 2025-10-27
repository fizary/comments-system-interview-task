export type Comment = {
  id: number;
  author: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type CommentsFilters = {
  limit?: number;
  offset?: number;
};

export type CommentPayload = {
  author: string;
  message: string;
};

export type CreateCommentPayload = CommentPayload;
export type UpdateCommentPayload = CommentPayload & {
  id: number;
};
