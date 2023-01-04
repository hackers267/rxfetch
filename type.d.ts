/*
 * Copyright (c) 2022.  by silence_zhpf
 */
declare type Store = Record<string, any>;
declare type IRequest = Omit<RequestInit, "method">;
declare type RequestMode = "core" | "no-core" | "same-origin";
declare type RequestMethod = "GET" | "POST";
declare type Config = {
  timeout?: number;
  requestInterceptors?: ((requestInit: IRequest) => IRequest)[];
  responseInterceptors?: any[];
  requestType?: "json" | "form";
  /**
   * 请求方法
   */
  method?: RequestMethod;
  /**
   * 请求头
   */
  headers?: any;
  /**
   * 请求模式
   */
  mode?: RequestMode;
};
type PostParams = {
  data: any;
};
type GetParams = {
  params?: Store;
};
