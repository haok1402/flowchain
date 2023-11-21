import React from "react";
import Container from "react-bootstrap/Container";
import Fade from "react-bootstrap/Fade";

import { useAnimte } from "../contexts/Animate";
import "./Footer.scss";

const Footer = React.memo(() => {
  const { showFooter } = useAnimte();
  const currentYear = new Date().getFullYear();

  return (
    <Fade in={showFooter}>
      <Container className="Footer__Container">
        {showFooter && (
          <p className="lead" style={{ textAlign: "right" }}>
            &copy; {currentYear} FlowChain. All rights reserved.
          </p>
        )}
      </Container>
    </Fade>
  );
});

export default Footer;
