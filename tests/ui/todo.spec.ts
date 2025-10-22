import { test } from "@playwright/test";
import { TodoMvcPage } from "../../pages/todo-page";

test.describe("TodoMVC demo site", () => {
  test("create-complete-delete post", async ({ page }) => {
    const todo = new TodoMvcPage(page);

    await test.step("Open TodoMVC site", async () => {
      await todo.open();
    });

    await test.step('Create post "Buy milk"', async () => {
      await todo.add("Buy milk");
      await todo.expectVisible("Buy milk");
    });

    await test.step("Mark as completed", async () => {
      await todo.complete("Buy milk");
      await todo.expectCompleted("Buy milk");
    });

    await test.step("Delete and make sure the list is empty", async () => {
      await todo.remove("Buy milk");
      await todo.expectEmpty();
    });
  });
});