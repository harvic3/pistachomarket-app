import React from "react";
import { Card } from "react-bootstrap";

export default function Category(props) {
  const { name } = props.category;
  const showSummary = props.summary || false;
  
  return(
    <Card.Text>{name}</Card.Text>
  );
}