import React from "react";
import { Container, Row } from "react-bootstrap";
import Loading from "../Loading/index";
import Product from "../Product/index";
import "./ProductList.scss";

export default function ProductList(props) {
  const { result, loading, error } = props.data;
  const addProductToCar = props.addProductToCar;

  const products = result ? result.result : null;

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
