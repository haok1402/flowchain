import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faMoon,
  faSun,
  faBook,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import { useTheme } from "../contexts/Theme";

const NavBar = React.memo(() => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Navbar expand="lg" style={{ userSelect: "none" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FontAwesomeIcon
            icon={faTerminal}
            style={{ marginRight: "0.5rem" }}
          />
          FlowChain.net
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to={"/tutorials"}>
              <Button
                variant={`outline-${theme === "light" ? "dark" : "light"}`}
              >
                <FontAwesomeIcon
                  icon={faBook}
                  style={{ marginRight: "0.5rem" }}
                />
                Tutorials
              </Button>
            </Nav.Link>
            <Nav.Link as={Link} to={"/dashboard"}>
              <Button
                variant={`outline-${theme === "light" ? "dark" : "light"}`}
              >
                <FontAwesomeIcon
                  icon={faHome}
                  style={{ marginRight: "0.5rem" }}
                />
                Dashboard
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Button
            variant="link"
            onClick={toggleTheme}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FontAwesomeIcon
              icon={theme === "light" ? faSun : faMoon}
              style={{ marginRight: "0.5rem" }}
            />
            {theme === "light" ? "Light" : "Dark"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;
