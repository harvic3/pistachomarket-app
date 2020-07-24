import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as CarEmpty } from "../../assets/svg/shoppingCar.svg";
import { ReactComponent as CarNotEmpty } from "../../assets/svg/carNotEmpty.svg";
import "./CarProducts.scss";

export default function CarProduct(props) {
  const [carItems, setCarItems] = useState([]);
  const [openCloseCar, setOpenCloseCar] = useState(false);
  const [carHasItems, setCarHasItems] = useState(false);
  const { shoppingCar, emptyShoppingCar, removeItem } = props;
  const carWidth = openCloseCar ? 350 : 0;

  useEffect(() => {
    setCarHasItems(shoppingCar?.carItems?.length > 0 ? true : false);
    setCarItems(shoppingCar?.carItems ? shoppingCar.carItems : []);
  }, [shoppingCar]);

  const toggleCar = () => {
    setOpenCloseCar(!openCloseCar);
    document.body.style.overflow = !openCloseCar ? "hidden" : "scroll";
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
        <CarProductsContainer carItems={carItems} removeItem={removeItem} />
        <CarProductsFooter emptyShoppingCar={emptyShoppingCar} total={0} />
      </div>
    </div>
  );
}

function CarProductsContainer(props) {
  const [items, setCarItems] = useState([]);
  const { carItems = [], removeItem } = props;

  useEffect(() => {
    setCarItems(carItems);
  }, [carItems]);

  return (
    <div className="car-product-container">
      {items.map((carItem, index) => {
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

function CarProductItem(props) {
  const { removeItem, carItem } = props;
  const { name, firtsUrlImage, productDetail, quantity } = carItem;

  return (
    <div className="car-product-item">
      <img src={firtsUrlImage} alt={name} />
      <div className="car-product-info">
        <div>
          <h5>{name.substring(0, 23)}</h5>
          <p>$ {productDetail.price} USD</p>
        </div>
        <div className="buttons-quantity">
          <Button
            className="button-remove"
            onClick={() => removeItem(carItem)}
            variant="outline-primary"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

// function CarProductItem(props) {
//   const { name, firtsUrlImage, productDetail, quantity } = props.carItem;

//   return (
//     <div className="car-product-item">
//       <img src={firtsUrlImage} alt={name} />
//       <div className="car-product-info">
//         <div>
//           <h5>{name.substring(0, 23)}</h5>
//           <p>$ {productDetail.price} USD</p>
//         </div>
//         <div className="buttons-quantity">
//           <Button className="button-quantity" variant="outline-primary">
//             -
//           </Button>
//           <p className="product-quantity" >{quantity}</p>
//           <Button className="button-quantity" variant="outline-primary">
//             +
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

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

function CarProductsFooter(props) {
  const { emptyShoppingCar } = props;

  return (
    <div className="car-products-footer">
      <div></div>
      <Button
        className="button-empty"
        onClick={() => emptyShoppingCar()}
        variant="outline-warning"
      >
        Empty
      </Button>
    </div>
  );
}
