import {
  faBook,
  faHome,
  faMoon,
  faSun,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Fade from "react-bootstrap/Fade";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import { useAnimte } from "../contexts/Animate";
import { useTheme } from "../contexts/Theme";
import "./TopNavBar.scss";

const NavBar = React.memo(() => {
  const { theme, toggleTheme } = useTheme();
  const { showNavItems } = useAnimte();
  return (
    <Navbar expand="lg" className="TopNavBar__Container" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FontAwesomeIcon icon={faTerminal} className="TopNavBar__Icon" />
          FlowChain
        </Navbar.Brand>
        <Fade in={showNavItems}>
          <Navbar.Toggle />
        </Fade>
        <Navbar.Collapse>
          <Fade in={showNavItems}>
            <Nav>
              {showNavItems && (
                <>
                  <Nav.Link as={Link} to={"/tutorials"}>
                    <Button
                      variant={`outline-${
                        theme === "light" ? "dark" : "light"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faBook}
                        className="TopNavBar__Icon"
                      />
                      Tutorials
                    </Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/dashboard"}>
                    <Button
                      variant={`outline-${
                        theme === "light" ? "dark" : "light"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faHome}
                        className="TopNavBar__Icon"
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
                  onClick={toggleTheme}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <FontAwesomeIcon
                    icon={theme === "light" ? faSun : faMoon}
                    className="TopNavBar__Icon"
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
