import React from "react";
import { Card } from "react-bootstrap";
import "./ProductImage.scss";

export default function ProductImage(props) {
  const { url } = props.image;
  return <Card.Img className="list-product-image" variant="top" src={url} />;
}
