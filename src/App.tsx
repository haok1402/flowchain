import { CssBaseline } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

import { DialogProvider } from "src/contexts/Dialog";
import { FirebaseProvider } from "src/contexts/Firebase";
import { WorkflowProvider } from "src/contexts/Workflow";
import Canvas from "src/pages/Canvas";

const AppTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: indigo[500],
    },
  },
});

const AppContext: React.FC<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    return (
      <ThemeProvider theme={AppTheme}>
        <CssBaseline />
        <FirebaseProvider>
          <DialogProvider>
            <WorkflowProvider>{children}</WorkflowProvider>
          </DialogProvider>
        </FirebaseProvider>
      </ThemeProvider>
    );
  },
);

const App = React.memo(() => {
  return (
    <AppContext>
      <Canvas />
    </AppContext>
  );
});

export default App;
