import { CssBaseline } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

import Workflow from "src/components/Workflow";
import { WorkflowProvider } from "src/contexts/Workflow";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: indigo[500],
    },
  },
});

const App = React.memo(() => {
  return (
    <WorkflowProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Workflow />
      </ThemeProvider>
    </WorkflowProvider>
  );
});

export default App;
