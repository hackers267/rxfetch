/*
 * Copyright (c) 2022.  by silence_zhpf
 */
import { of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

type Input = string | Request;

class RxFetch {
  private readonly config: Config;

  private constructor(config: Store = {}) {
    this.config = config;
  }

  public static of(config: Config = { requestType: "json" }) {
    return new RxFetch(config);
  }

  public get<T = Response>(url: string, params: GetParams = {}) {
    return this.request<T>(url, { ...params, method: "GET" });
  }

  public post<T = Response>(url: string, params: PostParams = { data: {} }) {
    const { requestType } = this.config;
    let { data, ...rest } = params;
    const body = genBody();
    const headers = genHeaders();

    return this.request<T>(url, { ...rest, headers, body, method: "POST" });

    function genHeaders() {
      if (requestType === "json") {
        return { "Content-Type": "application/json" };
      }
      return {};
    }

    function genBody() {
      let body = {};
      if (requestType === "json") {
        body = JSON.stringify(data);
      }
      return body;
    }
  }

  private request<T = Response>(
    url: Input,
    requestInit: Store = { method: "GET" }
  ) {
    const config = this.config;
    const { requestInterceptors } = config;
    let init: any = {};
    if (requestInterceptors) {
      init = requestInterceptors.reduce((acc, interceptor) => {
        const result = interceptor(acc);
        return { ...acc, ...result };
      }, {});
    }
    return of({ ...requestInit, ...init }).pipe(
      switchMap((config) => {
        return fromFetch<T>(url, config);
      })
    );
  }
}

export { RxFetch };
