const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface FetchOptions extends RequestInit {
  token?: string;
}

let refreshPromise: Promise<string | null> | null = null;

async function doRefresh(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const stored = localStorage.getItem('refreshToken');
      if (!stored) return null;

      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: stored }),
      });

      if (!res.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
      }

      const json = await res.json();
      localStorage.setItem('accessToken', json.data.accessToken);
      localStorage.setItem('refreshToken', json.data.refreshToken);
      return json.data.accessToken;
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
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

  if (res.status === 401 && endpoint !== '/auth/refresh') {
    const newToken = await doRefresh();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      const retryRes = await fetch(`${API_BASE}${endpoint}`, {
        ...fetchOpts,
        headers,
      });
      if (retryRes.ok) {
        const json = await retryRes.json();
        return json.data;
      }
    }
    throw new ApiError('Session expired. Please login again.', 401);
  }

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
