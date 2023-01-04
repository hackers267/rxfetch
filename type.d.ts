/*
 * Copyright (c) 2022.  by silence_zhpf
 */
declare type Store = Record<string, any>;
declare type Method = "POST" | "GET";
declare type IRequest = Omit<RequestInit, "method">;
declare type Config = {
  timeout?: number;
  requestInterceptors?: ((requestInit: IRequest) => IRequest)[];
  responseInterceptors?: any[];
  requestType?: "json" | "form";
};
type PostParams = {
  data: any;
};
type GetParams = {
  params?: string;
};
