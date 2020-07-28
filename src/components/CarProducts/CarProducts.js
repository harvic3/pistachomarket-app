import "./CarProducts.scss";
import React, { useState, useContext } from "react";
import { store, actions } from "../../store";
import { Button } from "react-bootstrap";
import { ReactComponent as CarEmpty } from "../../assets/svg/shoppingCar.svg";
import { ReactComponent as CarNotEmpty } from "../../assets/svg/carNotEmpty.svg";
import CarProductsContainer from "./CarProductsContainer/index";
import { emptyCarService } from "../../services/carService";
import { cleanShoppingCar } from "../../utils/shoppingCarTool";
import { toast } from "react-toastify";

export default function CarProduct() {
  const [openCloseCar, setOpenCloseCar] = useState(false);
  const { state } = useContext(store);
  const { carHasItems } = state;
  const carWidth = openCloseCar ? 350 : 0;

  const toggleCar = () => {
    setOpenCloseCar(!openCloseCar);
    document.body.classList.toggle("body-no-scroll", !openCloseCar);
  };

  return (
    <div>
      <Button variant="link" className="car-button">
        {carHasItems ? (
          <CarNotEmpty onClick={() => toggleCar()} />
        ) : (
          <CarEmpty onClick={() => toggleCar()} />
        )}
      </Button>
      <div className="car-products" style={{ width: carWidth }}>
        <CarProductsHeader toggleCar={toggleCar} />
        <CarProductsContainer />
        <CarProductsFooter />
      </div>
    </div>
  );
}

function CarProductsHeader(props) {
  const { toggleCar } = props;

  return (
    <div className="car-products-header">
      <div>
        <Button
          className="button-close"
          onClick={() => toggleCar()}
          variant="outline-success"
        >
          Close
        </Button>
      </div>
    </div>
  );
}

function CarProductsFooter() {
  const { state, dispatch } = useContext(store);
  const { shoppingCar } = state;
  const { orderPriceDetail } = shoppingCar; 

  const emptyCar = async () => {
    const result = await emptyCarService(shoppingCar);
    if (!result.success) {
      toast.error(`Error empty car: ${result.message}`);
      return;
    }
    const cleanCar = cleanShoppingCar(shoppingCar);
    dispatch({ type: actions.SET_SHOPPING_CAR, value: cleanCar });
    toast.success("Shopping car is now empty.");
  };

  return (
    <div className="car-products-footer">
      <div></div>
      <Button
        className="button-empty"
        onClick={() => emptyCar()}
        variant="outline-warning"
      >
        Empty
      </Button>
      <div className="total-details" >
        <p>{orderPriceDetail?.items || 0} Units</p>
        <p>Total: $ {orderPriceDetail?.total || 0} USD</p>
      </div>
    </div>
  );
}
