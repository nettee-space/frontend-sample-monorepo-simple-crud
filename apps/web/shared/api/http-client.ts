export const BASE_URL = 'http://localhost:4000/api';

interface HttpClientOptions extends RequestInit {
  queryParams?: Record<string, string | number | undefined>;
}

export const httpClient = async <T>(
  endpoint: string,
  options?: HttpClientOptions
): Promise<T> => {
  const url = new URL(`${BASE_URL}${endpoint}`);

  // queryParams가 있을 경우 URL에 추가
  if (options?.queryParams) {
    Object.entries(options.queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
};
