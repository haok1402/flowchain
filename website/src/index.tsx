import { CssBaseline } from "@mui/material";
import { purple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "reactflow";

import Workflow from "src/components/Workflow";
import { WorkflowProvider } from "src/contexts/Workflow";
import "src/index.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: purple[700],
    },
  },
});

const App = React.memo(() => {
  return (
    <ThemeProvider theme={theme}>
      <ReactFlowProvider>
        <WorkflowProvider>
          <CssBaseline />
          <Workflow />
        </WorkflowProvider>
      </ReactFlowProvider>
    </ThemeProvider>
  );
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
