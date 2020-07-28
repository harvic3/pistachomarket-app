import "./ProductList.scss";
import React, { useContext } from "react";
import { store, actions } from "../../store";
import { Container, Row } from "react-bootstrap";
import Loading from "../Loading/index";
import Product from "../Product/index";
import { createCarService, addItemCarService } from "../../services/carService";
import { itemExists } from "../../utils/shoppingCarTool";
import { toast } from "react-toastify";

export default function ProductList(props) {
  const { state, dispatch } = useContext(store);
  const { shoppingCar, page, perPage, filterName, selectedCats } = state;
  const { data, saveCarChanges} = props;
  const { result, loading, error } = data || {};
  const products = result ? result.result : [];

  const addProductToCar = async (detail) => {
    if (!shoppingCar.id) {
      const result = await createCarService(detail);
      if (!result.success) {
        toast.error(`Creating car error: ${result.message}`);
        return;
      }
      result.data.orderPriceDetail = result.data.carItems[0].orderPriceDetail;
      saveCarChanges(result.data);
      toast.success("Product was added.");
      dispatch({ type: actions.SET_SHOPPING_CAR, value: result.data });
      return;
    }
    const exists = itemExists(detail.id, shoppingCar.carItems);
    if (exists) {
      toast.info("Item already exist");
      return;
    }
    const result = await addItemCarService(shoppingCar, detail);
    if (!result.success) {
      toast.error(`Error adding product: ${result.message}`);
      return;
    }
    shoppingCar.carItems.push(result.data);
    shoppingCar.orderPriceDetail = result.data.orderPriceDetail;
    saveCarChanges(result.data);
    toast.success("Product was added.");
    dispatch({ type: actions.SET_SHOPPING_CAR, value: shoppingCar });
  };

  return (
    <Container className="product-list">
      <Row>
        {loading || !products ? (
          <Loading />
        ) : (
          products.map((product, index) => {
            return (
              <Product key={product.id} product={product} showSummary={true} addProductToCar={addProductToCar} />
            );
          })
        )}
      </Row>
    </Container>
  );
}
