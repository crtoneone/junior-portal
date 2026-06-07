const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchApi<T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, ...fetchOpts } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOpts,
    headers,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(json.message || 'Something went wrong', res.status, json.errors);
  }

  return json.data;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: any,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  get: <T = any>(endpoint: string, token?: string) =>
    fetchApi<T>(endpoint, { method: 'GET', token }),

  post: <T = any>(endpoint: string, body?: any, token?: string) =>
    fetchApi<T>(endpoint, { method: 'POST', body: body ? JSON.stringify(body) : undefined, token }),

  patch: <T = any>(endpoint: string, body?: any, token?: string) =>
    fetchApi<T>(endpoint, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined, token }),

  put: <T = any>(endpoint: string, body?: any, token?: string) =>
    fetchApi<T>(endpoint, { method: 'PUT', body: body ? JSON.stringify(body) : undefined, token }),

  delete: <T = any>(endpoint: string, token?: string) =>
    fetchApi<T>(endpoint, { method: 'DELETE', token }),
};
