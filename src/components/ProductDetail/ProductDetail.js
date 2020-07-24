import React from "react";
import { Card } from "react-bootstrap";

export default function ProductDetail(props) {
  const {
    id,
    code,
    description,
    netPrice,
    taxRate,
    tax,
    price,
    stock,
    disabled,
  } = props.detail;
  const showSummary = props.showSummary;
  
  return (
    <div>
      {showSummary ? (
        <Card.Text>$ {price.toFixed(2)} USD</Card.Text>
      ) : (
        <div>
          <Card.Text>$ {price.toFixed(2)} USD</Card.Text>
          <Card.Text>{description}</Card.Text>
        </div>
      )}
    </div>
  );
}
