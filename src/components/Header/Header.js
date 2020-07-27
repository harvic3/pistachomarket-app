import "./Header.scss";
import React from "react";
import { ReactComponent as Logo } from "../../assets/svg/pistacho.svg";
import { Container, Navbar, Nav } from "react-bootstrap";
import CarProducts from "../CarProducts/index";


export default function MainMenu() {

  return(
    <Navbar bg="dark" variant="dark" className="main-header" >
      <Container className="" >
        <BrandNav />
      </Container>
      <Container>
        <MenuNav />
        <CarProducts />
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