import React from "react";
import { Card } from "react-bootstrap";

export default function ProductDetail(props) {
  const { price } = props.detail;

  return (
    <div>
      <Card.Text>$ {price.toFixed(2)} USD</Card.Text>
    </div>
  );
}
