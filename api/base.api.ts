import { config } from "@/utils/config";

type FetchOptions = RequestInit & {
  token?: string;
};

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function fetchApi<Response>(
  endpoint: string,
  options: FetchOptions | undefined,
  rawResponse: true
): Promise<Response>;

export async function fetchApi<T>(
  endpoint: string,
  options?: FetchOptions,
  rawResponse?: boolean
): Promise<T>;

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {},
  rawResponse: boolean = false
): Promise<T | Response> {
  const { token, headers, ...rest } = options;
  const url = `${config.backendBaseUrl}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) defaultHeaders["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(url, {
      headers: { ...defaultHeaders, ...headers },
      ...rest,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }
      throw new ApiError(
        response.status,
        response.statusText || "API Error",
        errorData
      );
    }

    if (response.status === 204) return {} as T;

    if (rawResponse) return response;

    return response.json();
  } catch (error) {
    throw error;
  }
}
