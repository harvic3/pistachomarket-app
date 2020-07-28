import React from "react";
import { Card } from "react-bootstrap";
import "./ProductImage.scss";

export default function ProductImage(props) {
  const { image, showDetailModal } = props;
  return <Card.Img onClick={() => showDetailModal()} className="list-product-image" variant="top" src={image?.url} />;
}
