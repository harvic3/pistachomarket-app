import axios from "axios";
import Result from "./result";

const setAuthorization = (authorization) => {
  axios.defaults.headers.common["Authorization"] = authorization;
};

const post = async (url, reqData) => {
  const result = new Result();
  try {
    const response = await axios.post(url, reqData);
    result.setSuccess(response.data, response.status);
  } catch (err) {
    const error = err?.response;
    if (!err) {
      result.setError("Something went wrong!", 500);
      return result.resolve();
    }
    result.setError(
      error && error.data ? error.data.error : "Something went wrong!",
      error.status
    );
  }
  return result.resolve();
};

const put = async (url, reqData) => {
  const result = new Result();
  try {
    const response = await axios.put(url, reqData);
    result.setSuccess(response.data, response.status);
  } catch (err) {
    const error = err?.response;
    if (!err) {
      result.setError("Something went wrong!", 500);
      return result.resolve();
    }
    result.setError(
      error && error.data ? error.data.error : "Something went wrong!",
      error.status
    );
  }
  return result.resolve();
};

const delet = async (url) => {
  const result = new Result();
  try {
    const response = await axios.delete(url);
    result.setMessage(response.data.message, response.status);
  } catch (err) {
    const error = err?.response;
    if (!err) {
      result.setError("Something went wrong!", 500);
      return result.resolve();
    }
    result.setError(
      error && error.data ? error.data.error : "Something went wrong!",
      error.status
    );
  }
  return result.resolve();
};

export default {
  setAuthorization,
  post,
  put,
  delet,
};
