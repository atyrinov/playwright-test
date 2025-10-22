import { test, expect } from "@playwright/test";
import { ApiController } from "../../controllers/apiController";
import { PostBuilder } from "../../builders/PostBuilder";
import type { PostRequest, PostResponse } from "../../types/Post";

test.describe("JSONPlaceholder", () => {
  test("Get-Post-Delete", async ({ request }) => {
    const api = new ApiController(request);

    // GET /posts
    await test.step("Get list posts", async () => {
      const res = await api.getPosts();
      expect(res.status(), "Status").toBe(200);

      const posts = (await res.json()) as PostResponse[];
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);

      const first = posts[0];

      expect(typeof first.userId).toBe("number");
      expect(typeof first.id).toBe("number");
      expect(typeof first.title).toBe("string");
      expect(typeof first.body).toBe("string");
    });

    // POST 
    await test.step("Create new post", async () => {
      const payload: PostRequest = new PostBuilder()
        .title("QA Automation Post")
        .body("This post was created during Playwright API testing")
        .userId(777)
        .build();

      const res = await api.createPost(payload);
      expect(res.status(), "Status").toBe(201);

      const created = (await res.json()) as PostResponse;
      expect(created).toMatchObject({
        title: payload.title,
        body: payload.body,
        userId: payload.userId,
      });
      expect(created).toHaveProperty("id");
    });

    // DELETE /posts/1
    await test.step("Delete post with id=1", async () => {
      const r = await api.deletePost(1);
      expect(r.status(), "Статус DELETE /posts/1").toBe(200);
    });
  });
});