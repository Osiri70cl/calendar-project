import axios, { AxiosRequestConfig } from "axios";

import { cookies } from "next/headers";

import { handleApiError } from "../infrastructure/apiError";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function makeApiRequest(
  endpoint: string,
  method: string,
  data?: any,
  file?: boolean,
  retries = 3
) {
  const cookieStore = await cookies();
  const tokenData = cookieStore.get("tokenCalflow");
  const apiKey = "test";

  const config: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    method: method,
    url: endpoint,
    timeout: 15000,
    headers: {
      Accept: "application/json",
      "x-api-key": apiKey,
    },
  };

  if (tokenData) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${tokenData.value}`,
    };
  }

  if (data) {
    config.data = file ? data : data;
    if (!file) {
      config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
      };
    }
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      lastError = error as Error;

      if (axios.isAxiosError(error)) {
        if (error.response?.status && error.response?.status < 500) {
          const errorData = {
            status: error.response.status,
            error: error.response.data.message,
          };
          throw handleApiError(errorData);
        }

        if (
          error.code === "ECONNABORTED" ||
          error.message.includes("socket hang up")
        ) {
          console.warn(
            `Request attempt ${attempt + 1} failed: ${error.message}`
          );

          if (attempt < retries - 1) {
            const waitTime = Math.pow(2, attempt) * 1000;
            await delay(waitTime);
            continue;
          }
        }
      }

      if (attempt === retries - 1) {
        if (axios.isAxiosError(error) && error.response) {
          const errorData = {
            status: error.response.status,
            error: error.response.data.message,
          };
          throw handleApiError(errorData);
        }
        throw new Error(
          `Request failed after ${retries} attempts: ${lastError.message}`
        );
      }
    }
  }

  throw lastError || new Error("Unknown error occurred");
}

export default makeApiRequest;
