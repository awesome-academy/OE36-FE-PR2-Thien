import axios from "axios";
import baseUrl from "./apiConfig";
import getAuthHeader from "utils/getAuthHeader";
import getQueryString from "utils/queryString";
import { handleError, handleResponse } from "./response";

const get = (collection, filters = {}) => {
  const queryString = getQueryString(filters);
  return axios
    .get(`${baseUrl}/${collection}?${queryString}`, {
      headers: getAuthHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
};

const getById = (collection, id) => {
  return axios
    .get(`${baseUrl}/${collection}/${id}`, {
      headers: getAuthHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
};

const post = (collection, model) => {
  return axios
    .post(`${baseUrl}/${collection}`, model, { headers: getAuthHeader() })
    .then(handleResponse)
    .catch(handleError);
};

const put = (collection, id, model) => {
  return axios
    .put(`${baseUrl}/${collection}/${id}`, model, { headers: getAuthHeader() })
    .then(handleResponse)
    .catch(handleError);
};

const remove = (collection, id) => {
  return axios
    .delete(`${baseUrl}/${collection}/${id}`, { headers: getAuthHeader() })
    .then(handleResponse)
    .catch(handleError);
};

const upload = (collection, files) => {
  let formData = new FormData();
  for (let index = 0; index < files.length; index++) {
    formData.append(collection, files[index]);
  }
  return axios
    .post(`${baseUrl}/${collection}`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    })
    .then(handleResponse)
    .catch(handleError);
};

export const apiProvider = { get, getById, post, put, remove, upload };
