import axiosClient from "./axiosClient";
import { urlPistachioV1ShoppingCar } from "./constants";

const hasItems = (items) => {
  if (items && items.length > 0) {
    return true;
  }
  return false;
};

const itemExists = (itemId, items) => {
  if (items?.length > 0) {
    const existing = items.filter((item) => {
      return item.productDetailId == itemId;
    });
    return existing && existing.length > 0 ? true : false;
  }
  return false;
};

const createShoppingCar = async (
  detail,
  setShoppingCar,
  saveCarLocaly,
  toast
) => {
  const reqData = { orderId: 0, productDetailId: detail.id, quantity: 1 };
  const result = await axiosClient.post(
    `${urlPistachioV1ShoppingCar}`,
    reqData
  );
  if (result.success) {
    saveCarLocaly(result.data);
    result.data.orderPriceDetail = result.data.carItems[0].orderPriceDetail;
    setShoppingCar(result.data);
    return result.success;
  }
  toast.error(`Creating car error: ${result.message}`);
  return result.success;
};

const emptyShoppingCar = async (
  shoppingCar,
  setShoppingCar,
  saveCarLocaly,
  toast
) => {
  const result = await axiosClient.delet(
    `${urlPistachioV1ShoppingCar}/${shoppingCar.idMask}`
  );
  if (result.success) {
    shoppingCar.carItems = [];
    saveCarLocaly(shoppingCar);
    setShoppingCar(shoppingCar);
    toast.success("Shopping car is now empty.");
    return result.success;
  }
  toast.error(`Error empty car: ${result.message}`);
  return result.success;
};

const addItemToShoppingCar = async (
  detail,
  shoppingCar,
  setShoppingCar,
  saveCarLocaly,
  toast
) => {
  const reqData = {
    orderId: shoppingCar.id,
    productDetailId: detail.id,
    quantity: 1,
  };
  const result = await axiosClient.post(
    `${urlPistachioV1ShoppingCar}/${shoppingCar.idMask}/item`,
    reqData
  );
  if (result.success) {
    shoppingCar.carItems.push(result.data);
    shoppingCar.orderPriceDetail = result.data.orderPriceDetail;
    saveCarLocaly(shoppingCar);
    setShoppingCar(shoppingCar);
    return result.success;
  }
  toast.error(`Error adding product: ${result.message}`);
  return result.success;
};

const removeItemFromShoppingCar = async (
  detail,
  shoppingCar,
  setShoppingCar,
  saveCarLocaly,
  toast,
  itemExists
) => {
  const reqData = {
    orderId: shoppingCar.id,
    productDetailId: detail.productDetailId,
    quantity: 1,
  };
  const result = await axiosClient.put(
    `${urlPistachioV1ShoppingCar}/${shoppingCar.idMask}/item`,
    reqData
  );
  if (result.success && itemExists) {
    const existing = shoppingCar.carItems.filter((item) => {
      return item.productDetail.id === detail.productDetail.id;
    });
    const index = shoppingCar.carItems.indexOf(existing[0]);
    if (index > -1) {
      shoppingCar.carItems.splice(index, 1);
      shoppingCar.orderPriceDetail = result.data;
      saveCarLocaly(shoppingCar);
      setShoppingCar(shoppingCar);
      toast.success("Item was removed.");
      return result.success;
    }
  }
  toast.error(`Error removing product: ${result.message}`);
  return result.success;
};

export default {
  hasItems,
  itemExists,
  createShoppingCar,
  addItemToShoppingCar,
  emptyShoppingCar,
  removeItemFromShoppingCar,
};
