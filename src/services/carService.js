import axios from "axios";
import Result from "../utils/result";
import { urlPistachioV1ShoppingCar } from "../utils/constants";

const defaulErrorMessage = "Something went wrong!";
const defaultErrorCode = 500;

const normalizeError = (result, error) => {
  result.setError(
    error && error.data ? error.data.error : "Something went wrong!",
    error.status
  );
}

const createCarService = async (detail) => {
  const reqData = { orderId: 0, productDetailId: detail.id, quantity: 1 };
  const result = new Result();
  try {
    const response = await axios.post(`${urlPistachioV1ShoppingCar}`, reqData);
    result.setSuccess(response.data, response.status);
  } catch (err) {
    const error = err?.response;
    if (!err) {
      result.setError(defaulErrorMessage, defaultErrorCode);
      return result.resolve();
    }
    normalizeError(result, error);
  }
  return result.resolve();
};

const addItemCarService = async (shoppingCar, detail) => {
  const reqData = {
    orderId: shoppingCar.id,
    productDetailId: detail.id,
    quantity: 1,
  };
  const result = new Result();
  try {
    const response = await axios.post(
      `${urlPistachioV1ShoppingCar}/${shoppingCar.idMask}/item`,
      reqData
    );
    result.setSuccess(response.data, response.status);
  } catch (err) {
    const error = err?.response;
    if (!err) {
      result.setError(defaulErrorMessage, defaultErrorCode);
      return result.resolve();
    }
    normalizeError(result, error);
  }
  return result.resolve();
};

const removeItemCarService = async (shoppingCar, detail) => {
  const url = `${urlPistachioV1ShoppingCar}/${shoppingCar.idMask}/item`;
  const reqData = {
    orderId: shoppingCar.id,
    productDetailId: detail.productDetailId,
    quantity: 1,
  };
  const result = new Result();
  try {
    const response = await axios.put(url, reqData);
    result.setSuccess(response.data, response.status);
  } catch (err) {
    const error = err?.response;
    if (!err) {
      result.setError(defaulErrorMessage, defaultErrorCode);
      return result.resolve();
    }
    normalizeError(result, error);
  }
  return result.resolve();
};

const emptyCarService = async (shoppingCar) => {
  const result = new Result();
  try {
    const response = await axios.delete(
      `${urlPistachioV1ShoppingCar}/${shoppingCar.idMask}`
    );
    result.setMessage(response.data.message, response.status);
  } catch (err) {
    const error = err?.response;
    if (!err) {
      result.setError(defaulErrorMessage, defaultErrorCode);
      return result.resolve();
    }
    normalizeError(result, error);
  }
  return result.resolve();
};

export {
  createCarService,
  addItemCarService,
  removeItemCarService,
  emptyCarService,
};
