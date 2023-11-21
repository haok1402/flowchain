import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Link, Outlet } from "react-router-dom";

import { useFirebase } from "../contexts/Firebase";
import { useTheme } from "../contexts/Theme";
import "./PrivateRoute.scss";

const Loading = React.memo(() => {
  return (
    <Container className="PrivateRoute__Container">
      <Spinner animation="border" />
    </Container>
  );
});

const GoogleIcon = React.memo(() => {
  return (
    <svg viewBox="0 0 48 48" className="PrivateRoute__Icon">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
});

const GithubLightIcon = React.memo(() => {
  return (
    <svg viewBox="0 0 98 96" className="PrivateRoute__Icon">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="#24292f"
      />
    </svg>
  );
});

const GitHubDarkIcon = React.memo(() => {
  return (
    <svg viewBox="0 0 98 96" className="PrivateRoute__Icon">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="#fff"
      />
    </svg>
  );
});

const Authenticate = React.memo(() => {
  const { theme } = useTheme();
  const [showGitHubLightIcon, setShowGitHubLightIcon] = useState(
    theme === "light",
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { continueWithGoogle, continueWithGitHub } = useFirebase();
  const { continueWithEmailAndPassword } = useFirebase();

  return (
    <Container className="PrivateRoute__Container">
      <Form>
        <div className="mb-3 d-flex justify-content-center">
          <Link to="/" style={{ color: "inherit" }}>
            <FontAwesomeIcon icon={faTerminal} className="h1" />
          </Link>
        </div>
        <div className="mb-3">
          <Button
            style={{ width: "100%" }}
            variant={`outline-${theme === "light" ? "dark" : "light"}`}
            onClick={continueWithGoogle}
          >
            <GoogleIcon />
            Continue With Google
          </Button>
        </div>
        <div className="mb-3">
          <Button
            style={{ width: "100%" }}
            variant={`outline-${theme === "light" ? "dark" : "light"}`}
            onMouseEnter={() => setShowGitHubLightIcon(theme !== "light")}
            onMouseLeave={() => setShowGitHubLightIcon(theme === "light")}
            onClick={continueWithGitHub}
          >
            {showGitHubLightIcon ? <GithubLightIcon /> : <GitHubDarkIcon />}
            Continue With Github
          </Button>
        </div>
        <div style={{ width: "100%" }} className="d-flex align-items-center">
          <hr style={{ flex: 1 }} />
          <span style={{ margin: "0 1rem" }}>OR</span>
          <hr style={{ flex: 1 }} />
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            If you don't have an account, we'll create one for you.
          </Form.Text>
        </Form.Group>
        <Button
          style={{ width: "100%" }}
          variant={`outline-${theme === "light" ? "dark" : "light"}`}
          onClick={() => {
            continueWithEmailAndPassword(email, password);
          }}
        >
          Continue
        </Button>
      </Form>
    </Container>
  );
});

const PrivateRoute = () => {
  const { loading, user } = useFirebase();
  return loading ? <Loading /> : !user ? <Authenticate /> : <Outlet />;
};

export default PrivateRoute;
