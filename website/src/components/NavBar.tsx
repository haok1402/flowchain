import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Fade from "react-bootstrap/Fade";
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
import { useAnimte } from "../contexts/Animate";

const NavBar = React.memo(() => {
  const { theme, toggleTheme } = useTheme();
  const { showNavItems } = useAnimte();
  return (
    <Navbar
      expand="lg"
      style={{
        userSelect: "none",
        minHeight: "70px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" role="navigate-landing">
          <FontAwesomeIcon
            icon={faTerminal}
            style={{ marginRight: "0.5rem" }}
          />
          FlowChain
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Fade in={showNavItems}>
            <Nav>
              {showNavItems && (
                <>
                  <Nav.Link
                    as={Link}
                    to={"/tutorials"}
                    role="navigate-tutorials"
                  >
                    <Button
                      variant={`outline-${
                        theme === "light" ? "dark" : "light"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faBook}
                        style={{ marginRight: "0.5rem" }}
                      />
                      Tutorials
                    </Button>
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"/dashboard"}
                    role="navigate-dashboard"
                  >
                    <Button
                      variant={`outline-${
                        theme === "light" ? "dark" : "light"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faHome}
                        style={{ marginRight: "0.5rem" }}
                      />
                      Dashboard
                    </Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Fade>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Fade in={showNavItems}>
            <>
              {showNavItems && (
                <Button
                  variant="link"
                  role="toggle-theme"
                  onClick={toggleTheme}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <FontAwesomeIcon
                    icon={theme === "light" ? faSun : faMoon}
                    style={{ marginRight: "0.5rem" }}
                  />
                  {theme === "light" ? "Light" : "Dark"}
                </Button>
              )}
            </>
          </Fade>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;
