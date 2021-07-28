export function handleResponse(response) {
  if (response.data) {
    if (response.headers["x-total-count"]) {
      return {
        total: Number(response.headers["x-total-count"]),
        data: response.data,
      };
    }
    return {
      data: response.data,
    };
  }

  return response;
}

export function handleError(error) {
  if (error.data) {
    return error.data;
  }

  return error;
}
