import { CssBaseline } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

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
      <WorkflowProvider>
        <ThemeProvider theme={AppTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </WorkflowProvider>
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
