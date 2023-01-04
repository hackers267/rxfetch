/*
 * Copyright (c) 2022.  by silence_zhpf
 */
import { of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { stringify } from "qs";

type Input = string | Request;

class RxFetch {
  private readonly config: Config;

  private constructor(config: Store = {}) {
    this.config = config;
  }

  public static of(config: Config = { requestType: "json" }) {
    return new RxFetch(config);
  }

  private get headers(): Store {
    const { requestType } = this.config;
    const initHeaders = {
      accept: "application/json, text/plain, */*",
    };
    if (requestType === "json") {
      return Object.assign({}, initHeaders, {
        "Content-Type": "application/json",
      });
    }
    return initHeaders;
  }

  public get<T = Response>(url: string, params: GetParams = {}) {
    const { params: param } = params;
    const query = stringify(param);
    const headers = this.headers;
    return this.request<T>(`${url}?${query}`, { method: "GET", headers });
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

  public post<T = Response>(url: string, params: PostParams = { data: {} }) {
    const { requestType } = this.config;
    let { data, ...rest } = params;
    const body = genBody();
    const headers = this.headers;

    return this.request<T>(url, { ...rest, headers, body, method: "POST" });

    function genBody() {
      let body = {};
      if (requestType === "json") {
        body = JSON.stringify(data);
      }
      return body;
    }
  }
}

export { RxFetch };
