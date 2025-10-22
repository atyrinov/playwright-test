import type { PostRequest } from "../types/Post";

export class PostBuilder {
  private data: PostRequest = {
    title: "",
    body: "",
    userId: 0,
  };

  title(value: PostRequest["title"]) {
    this.data.title = value; return this;
  }

  body(value: PostRequest["body"]) {
    this.data.body = value; return this;
  }

  userId(value: PostRequest["userId"]) {
    this.data.userId = value; return this;
  }

  build(): PostRequest {
    if (!this.data.title) throw new Error("PostBuilder: 'title' is required");
    if (!this.data.body) throw new Error("PostBuilder: 'body' is required");
    if (typeof this.data.userId !== "number") throw new Error("PostBuilder: 'userId' must be a number");
    return { ...this.data };
  }
}