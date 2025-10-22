import { test, expect } from "@playwright/test";
import { ApiController } from "../../controllers/apiController";
import { PostBuilder } from "../../builders/PostBuilder";
import type { PostRequest, PostResponse } from "../../types/Post";

test.describe("JSONPlaceholder: API з контролером і білдером (інтерфейс)", () => {
  test("GET → POST → DELETE", async ({ request }) => {
    const api = new ApiController(request);

    // GET /posts
    await test.step("Get list posts", async () => {
      const r = await api.getPosts();
      expect(r.status(), "Status").toBe(200);

      const posts = (await r.json()) as PostResponse[];
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);

      const first = posts[0];

      expect(first).toMatchObject({
        userId: expect.any(Number),
        id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
      });
    });

    // POST /posts
    await test.step("Create new post", async () => {
      const payload: PostRequest = new PostBuilder()
        .title("QA Automation Post")
        .body("This post was created during Playwright API testing")
        .userId(777)
        .build();

      const r = await api.createPost(payload);
      expect(r.status(), "Status").toBe(201);

      const created = (await r.json()) as PostResponse;
      expect(created).toMatchObject({
        title: payload.title,
        body: payload.body,
        userId: payload.userId,
      });
      expect(created).toHaveProperty("id");
    });

    // DELETE /posts/1
    await test.step("Видалити пост з id=1", async () => {
      const r = await api.deletePost(1);
      expect(r.status(), "Статус DELETE /posts/1").toBe(200);
    });
  });
});