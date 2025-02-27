export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};
const BASE_URL = 'http://localhost:4000/api';

async function get(url: string) {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${BASE_URL}/${url}`, requestOptions).then(handleResponse);
}

async function post<T>(url: string, body: T) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(`${BASE_URL}/${url}`, requestOptions).then(handleResponse);
}

function put<T>(url: string, body: T) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(`${BASE_URL}/${url}`, requestOptions).then(handleResponse);
}

function _delete(url: string) {
  const requestOptions = {
    method: 'DELETE',
  };
  return fetch(`${BASE_URL}/${url}`, requestOptions).then(handleResponse);
}

function handleResponse(response: Response) {
  return response.text().then((text) => {
    try {
      const data = text ? JSON.parse(text) : {};
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    } catch {
      console.log('뭐가 문제야!!');
    }
  });
}
