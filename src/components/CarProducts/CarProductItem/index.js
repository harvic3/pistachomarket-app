import "../CarProducts.scss";
import React from "react";
import { Button } from "react-bootstrap";

export default function CarProductItem(props) {
  const { carItem, removeItem } = props;
  const { name, firtsUrlImage, productDetail } = carItem;

  const deleteItem = async (detail) => {
    await removeItem(detail);
  };

  return (
    <div className="car-product-item">
      <div className="car-product-info">
        <img src={firtsUrlImage} alt={name} />
        <div>
          <div>
            <h4 >{name.substring(0, 25)}</h4>
            <p className="price-detail" >$ {productDetail.price} USD</p>
          </div>
        </div>
      </div>
      <div className="buttons-quantity">
        <Button
          onClick={() => deleteItem(carItem)}
          className="button-remove"
          variant="outline-primary"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

//export default function CarProductItem(props) {
    // const { carItem, removeItem } = props;
    // const { name, firtsUrlImage, productDetail } = carItem;

    // const deleteItem = async (detail) => {
    //   await removeItem(detail);
    // };

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
