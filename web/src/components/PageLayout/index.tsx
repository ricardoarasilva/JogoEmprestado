import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { logout } from '../../services/auth';

const PageLayout:React.FC<{}> = (props) => {

  const history = useHistory();

  function Logoff() {
    logout();
    history.push("/login");
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Jogo Emprestado</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/friends">Amigos</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={Logoff}>Logoff</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        {props.children}
      </Container>
    </>
  )
}

export default PageLayout;