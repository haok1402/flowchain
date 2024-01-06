import { CssBaseline } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "reactflow";

import { DialogProvider } from "@contexts/Dialog";
import { FirebaseProvider } from "@contexts/Firebase";
import { WorkflowProvider } from "@contexts/Workflow";
import Canvas from "@pages/Canvas";
import "reactflow/dist/style.css";

const AppTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: indigo[500],
    },
  },
});

const AppContexts: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <FirebaseProvider>
        <DialogProvider>
          <ReactFlowProvider>
            <WorkflowProvider>{children}</WorkflowProvider>
          </ReactFlowProvider>
        </DialogProvider>
      </FirebaseProvider>
    </ThemeProvider>
  );
};

const App = React.memo(() => {
  return (
    <AppContexts>
      <Canvas />
    </AppContexts>
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
