import React from "react";
import Category from "../Category/index";
import ProductDetail from "../ProductDetail/index";
import ProductImage from "./ProductImage/index";
import { Col, Card, Button } from "react-bootstrap";
import "./Product.scss";

export default function Product(props) {
  const { product, showSummary, addProductToCar } = props;
  const productDetail = product.details[0];

  const addItem = async (detail) => {
    await addProductToCar(detail);
  }

  return (
    <Col xs={6} md={4} lg={3} className="product">
      <Card>        
        <ProductImage image={product.images[0]} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <ProductDetail detail={productDetail} showSummary={showSummary} />
          <Category category={product.category} />
          <Button
            variant="outline-primary"
            onClick={() => addItem(productDetail)}
          >
            Add to car
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
