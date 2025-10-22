import { APIRequestContext } from "@playwright/test";
import { BaseApi } from "./BaseApi";

export class ApiController extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, "https://jsonplaceholder.typicode.com");
  }

  getPosts() {
    return this.request.get(this.url("/posts"));
  }

  createPost(body: object) {
    return this.request.post(this.url("/posts"), { data: body });
  }

  deletePost(id: number) {
    return this.request.delete(this.url(`/posts/${id}`));
  }
}