export function handleResponse(response) {
  if (response.data) {
    if (response.headers["x-total-count"]) {
      return {
        total: Number(response.headers["x-total-count"]),
        status: response.status,
        data: response.data,
      };
    }
    return {
      status: response.status,
      data: response.data,
    };
  }

  return response;
}

export function handleError(error) {
  if (error.response) {
    return error.response;
  }
  return error;
}
