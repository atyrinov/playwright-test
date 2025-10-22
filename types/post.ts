export interface PostRequest {
  title: string;
  body: string;
  userId: number;
}

// Create/read post
export interface PostResponse extends PostRequest {
  id: number;
}