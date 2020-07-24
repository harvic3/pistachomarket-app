import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import "./Loading.scss";

export default function Loading() {
  const [dots, setDots] = useState("");

  // useEffect(() => {
  //   (() => {
  //     setTimeout(() => {
  //       if (dots.length === 3) {
  //         setDots(".");
  //         return;
  //       }
  //       setDots(`${dots}.`);
  //     }, 200);
  //   })();
  // });

  return (
    <div className="loading">
      <Spinner animation="border"></Spinner>
      <h3 >Loading{dots}</h3>
    </div>
  );
}
