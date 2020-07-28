import React, { useState } from "react";
import Category from "../Category/index";
import ProductDetail from "../ProductDetail/index";
import ProductImage from "./ProductImage/index";
import { Col, Card, Button, Modal, Row } from "react-bootstrap";
import "./Product.scss";

export default function Product(props) {
  const [showDetail, setShowDetail] = useState(false);
  const { product, showSummary, addProductToCar } = props;
  const productDetail = product.details[0];

  const closeDetailModal = () => setShowDetail(false);
  const showDetailModal = () => setShowDetail(true);

  const addItem = async (detail) => {
    await addProductToCar(detail);
  };

  return (
    <Col xs={6} md={4} lg={3} className="product">
      <Card>
        <ProductImage
          showDetailModal={showDetailModal}
          image={product.images[0]}
        />
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
      <Modal show={showDetail} onHide={closeDetailModal} animation={false}>
        <ModalDetail
          name={product.name}
          detail={productDetail}
          setShowDetail={setShowDetail}
          images={product.images}
        />
      </Modal>
    </Col>
  );
}

function ModalDetail(props) {
  const { name, detail, setShowDetail, images = [] } = props;
  const { code, description, taxRate, tax, price, stock } = detail;
  const closeDetailModal = () => setShowDetail(false);

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>
          {name} - Code: {code}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Card>
              <Card.Img
                className="list-product-image"
                variant="top"
                src={images[0].url || null}
              />
            </Card>
          </Col>
          <Col>
            <p>{description}</p>
            <p>Price: ${price} USD</p>
            <p>Tax rate: {taxRate}%</p>
            <p>Tax: ${tax} USD</p>
            <p>Stock: {stock} units</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeDetailModal}>
          Close
        </Button>
      </Modal.Footer>
    </div>
  );
}
