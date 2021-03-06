export class BadStatusError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = 'BadStatusError';
    this.code = code;
  }
}

export const postRequest = async (url = '', data = {}) => {
  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new BadStatusError(await response.text(), response.status);
  }
  return response.json();
};

export const putRequest = async (url = '', data = {}) => {
  const response: Response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new BadStatusError(await response.text(), response.status);
  }
  return response.json();
};

export const deleteRequest = async (url = '', data = {}) => {
  const response: Response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new BadStatusError(await response.text(), response.status);
  }
  return response.json();
};

export const getRequest = async (url = '') => {
  const response: Response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new BadStatusError(await response.text(), response.status);
  }
  return response.json();
};
