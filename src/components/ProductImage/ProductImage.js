import React from "react";
import { Card } from "react-bootstrap";

export default function ProductImage(props) {
  const { order, url } = props.image;
  return <Card.Img className="product-image" variant="top" src={url} />;
}
