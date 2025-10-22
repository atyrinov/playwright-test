import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class TodoMvcPage extends BasePage {
  readonly newPost: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    super(page);
    this.newPost = this.page.locator(".new-todo");
    this.todoItems = this.page.locator(".todo-list li");
  }

  async open(): Promise<void> {
    await this.navigateUrl("https://demo.playwright.dev/todomvc");
    await this.waitForPageLoad();
  }

  private item(post: string) {
    const title = this.page.getByTestId('todo-title').filter({ hasText: post });
    return this.page.locator('.todo-list li').filter({ has: title });
  }

  private toggle(post: string) {
    return this.item(post).locator(".toggle");
  }

  private delete(post: string) {
    return this.item(post).locator(".destroy");
  }

  // actions
  async add(post: string) {
    await this.newPost.fill(post);
    await this.newPost.press("Enter");
  }

  async complete(post: string) {
    await this.toggle(post).click();
  }

  async remove(post: string) {
    await this.item(post).hover();
    await this.delete(post).click();
  }

  // expectations
  async expectVisible(post: string) {
    await expect(this.item(post)).toBeVisible();
  }

  async expectCompleted(post: string) {
    const item = this.item(post);
    await expect(item).toHaveCount(1);
    await expect(item).toHaveClass("completed");
  }

  async expectEmpty() {
    await this.todoItems.first().waitFor({ state: "detached" })
      .catch(() => { });
    await expect(this.todoItems).toHaveCount(0);
  }
}