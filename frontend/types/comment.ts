export type Comment = {
  id: number;
  author: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCommentPayload = {
  author: string;
  message: string;
};

export type UpdateCommentPayload = {
  id: number;
} & (
  | { author: string; message: string }
  | {
      author: string;
    }
  | { message: string }
);
