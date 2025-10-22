import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export abstract class BaseApi {
  protected readonly request: APIRequestContext;
  protected readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  protected url(path: string) {
    return `${this.baseUrl}/${path}`;
  }

  protected async expectStatus(resp: APIResponse, code: number) {
    expect(resp.status(), `HTTP ${await resp.text()}`).toBe(code);
  }
}