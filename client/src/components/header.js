import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="/">Data Visualization</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;