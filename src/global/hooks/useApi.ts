"use client";

import axios from "axios";

import { useState } from "react";

import { handleApiError } from "../infrastructure/apiError";

export enum Methods {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "DELETE",
}

const useApi = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const callApi = async (
    method: Methods,
    url: string,
    data?: any,
    timeout = 20000
  ) => {
    const queryParams = new URLSearchParams();
    for (const key in data) {
      if (data[key] !== "") {
        queryParams.append(key, data[key]);
      }
    }

    if (method === Methods.GET) {
      queryParams.append("_t", Date.now().toString());
    }

    const urlFinal =
      method === Methods.GET && queryParams.toString()
        ? `${url}?${queryParams.toString()}`
        : url;

    let config: any = {
      method,
      url: urlFinal,

      headers: {
        "Content-Type": "application/json",
      },
      timeout,
    };
    if (data) {
      config.data = data;
    }

    try {
      setLoading(true);
      const response: any = await axios(config);

      setLoading(false);

      setResponse(response.data);
    } catch (error: any) {
      const errorData = {
        error: error?.response?.data,
        status: error?.response?.status,
      };

      setError(handleApiError(errorData));
      setLoading(false);
    }
  };

  return { response, error, loading, callApi };
};

export default useApi;
