const itemExists = (itemId, items) => {
  if (items?.length > 0) {
    const existing = items.filter((item) => {
      return item.productDetailId === itemId;
    });
    return existing && existing.length > 0 ? true : false;
  }
  return false;
};

const removeItemFromCar = async (carItems, detail) => {
  if (carItems?.length > 0) {
    const existing = carItems.filter((item) => {
      return item.productDetailId === detail.productDetailId;
    });
    const index = carItems.indexOf(existing[0]);
    if (index > -1) {
      carItems.splice(index, 1);
    }
    return true;
  }
  return false;
};

const cleanShoppingCar = (shoppingCar) => {
  return {
    ...shoppingCar,
    total: 0,
    taxes: 0,
    items: 0,
    orderPriceDetail: { items: 0, total: 0 },
    carItems: [],
  };
};

export { itemExists, removeItemFromCar, cleanShoppingCar };
