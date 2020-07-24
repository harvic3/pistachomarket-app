import React from "react";
import { ReactComponent as Logo } from "../../assets/svg/pistacho.svg";
import { Container, Navbar, Nav } from "react-bootstrap";
import CarProducts from "../CarProducts/index";
import "./Header.scss";

export default function MainMenu(props) {  
  const { shoppingCar, emptyShoppingCar, removeItem } = props;

  return(
    <Navbar bg="dark" variant="dark" className="main-header" >
      <Container className="" >
        <BrandNav />
      </Container>
      <Container>
        <MenuNav />
        <CarProducts shoppingCar={shoppingCar} emptyShoppingCar={emptyShoppingCar} removeItem={removeItem} />
      </Container>
    </Navbar>
  );
}

function BrandNav() {
  return(
    <Navbar.Brand >
      <Logo /> 
      <Navbar.Brand  href="#home">Pistachio Market</Navbar.Brand>
    </Navbar.Brand>
  );
}

function MenuNav() {
  return(
    <Nav className="mr-auto">
    </Nav>
  );
}