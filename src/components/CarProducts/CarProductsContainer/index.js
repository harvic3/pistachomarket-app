import "../CarProducts.scss";
import React, { useContext } from "react";
import { store, actions } from "../../../store";
import { removeItemCarService } from "../../../services/carService";
import { removeItemFromCar } from "../../../utils/shoppingCarTool";
import CarProductItem from "../CarProductItem/index";
import { cleanShoppingCar } from "../../../utils/shoppingCarTool";
import { toast } from "react-toastify";

export default function CarProductsContainer(props) {
  const { state, dispatch } = useContext(store);
  const { shoppingCar } = state;
  const { carItems = [] } = shoppingCar;

  const removeItem = async (detail) => {
    const result = await removeItemCarService(shoppingCar, detail);
    if (!result.success) {
      toast.error(`Error removing product: ${result.message}`);
      return;
    }
    const cleaned = await removeItemFromCar(carItems, detail);
    if (cleaned) {
      shoppingCar.orderPriceDetail = result.data;
      shoppingCar.carItems = carItems;
      if (carItems.length === 0) {
        const cleanCar = cleanShoppingCar(shoppingCar);
        shoppingCar.orderPriceDetail = cleanCar.orderPriceDetail;
      }
      dispatch({ type: actions.SET_SHOPPING_CAR, value: shoppingCar });
      toast.success("Item was removed.");
    }
  };

  return (
    <div className="car-product-container">
      {carItems.map((carItem, index) => {
        return (
          <CarProductItem
            key={index}
            carItem={carItem}
            removeItem={removeItem}
          />
        );
      })}
    </div>
  );
}
