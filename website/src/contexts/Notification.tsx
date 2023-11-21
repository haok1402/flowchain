import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { createContext, useContext, useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const NotificationContext = createContext({
  error: "",
  setError: (error: string) => {},
});

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [error, setError] = useState("");
  return (
    <NotificationContext.Provider value={{ error, setError }}>
      <ToastContainer className="p-3" position="top-center">
        <Toast
          autohide
          bg="danger"
          delay={5000}
          style={{
            color: "white",
            userSelect: "none",
          }}
          show={error !== ""}
          onClose={() => {
            setError("");
          }}
        >
          <Toast.Header>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ marginRight: "0.5rem" }}
            />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </ToastContainer>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => useContext(NotificationContext);

export { NotificationProvider, useNotification };
