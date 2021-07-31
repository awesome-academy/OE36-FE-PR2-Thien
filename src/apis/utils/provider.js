import axios from "axios";
import { BASE_URL } from "utils/constant";
import getQueryString from "utils/queryString";
import { handleError, handleResponse } from "./response";

const get = (collection, filters = {}) => {
  let queryString = getQueryString(filters);
  return axios
    .get(`${BASE_URL}/${collection}?${queryString}`)
    .then(handleResponse)
    .catch(handleError);
};

const post = (collection, model) => {
  return axios
    .post(`${BASE_URL}/${collection}`, model)
    .then(handleResponse)
    .catch(handleError);
};

const put = (collection, model) => {
  return axios
    .put(`${BASE_URL}/${collection}`, model)
    .then(handleResponse)
    .catch(handleError);
};

const remove = (collection, id) => {
  return axios
    .delete(`${BASE_URL}/${collection}`, id)
    .then(handleResponse)
    .catch(handleError);
};

const upload = (collection, files) => {
  let formData = new FormData();
  for (let index = 0; index < files.length; index++) {
    formData.append(collection, files[index]);
  }
  return axios
    .post(`${BASE_URL}/${collection}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(handleResponse)
    .catch(handleError);
};

export const apiProvider = { get, post, put, remove, upload };
