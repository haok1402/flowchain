import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import { useTheme } from "../contexts/Theme";

const NotFound = React.memo(() => {
  const { theme } = useTheme();
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh", userSelect: "none" }}
    >
      <h3 style={{ marginBottom: "1rem" }}>404 | Page Not Found</h3>
      <Link to="/">
        <Button variant={`outline-${theme === "light" ? "dark" : "light"}`}>
          Back to Home
        </Button>
      </Link>
    </Container>
  );
});

export default NotFound;
