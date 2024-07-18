import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/">
          <Navbar.Brand>LOGO</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/">
              <Nav.Link as="span">Home</Nav.Link>
            </NavLink>
            {user && (
              <NavLink to="/students">
                <Nav.Link as="span">Students</Nav.Link>
              </NavLink>
            )}
            <NavLink to="/about">
              <Nav.Link as="span">About</Nav.Link>
            </NavLink>
            <NavLink to="/contacts">
              <Nav.Link as="span">Contacts</Nav.Link>
            </NavLink>
            {user ? (
              <NavLink to="/profile">
                <Nav.Link as="span">Profile</Nav.Link>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Nav.Link as="span">Login</Nav.Link>
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
