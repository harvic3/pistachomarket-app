import React from "react";
import Category from "../Category/index";
import ProductDetail from "../ProductDetail/index";
import ProductImage from "../ProductImage/index";
import { Col, Card, Button } from "react-bootstrap";
import "./Product.scss";

export default function Product(props) {
  const { product, showSummary, addProductToCar } = props;
  const productDetail = product.details[0];

  return (
    <Col xs={6} md={4} lg={3} className="product">
      <Card>
        {product.images.map((image, index) => {
          return <ProductImage key={index} image={image} />;
        })}
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <ProductDetail detail={productDetail} showSummary={showSummary} />
          <Category category={product.category} />
          <Button
            onClick={() => addProductToCar(productDetail)}
            variant="outline-primary"
          >
            Add to car
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
