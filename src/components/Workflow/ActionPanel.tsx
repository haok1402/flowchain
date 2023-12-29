import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { MdPlayArrow } from "react-icons/md";
import { Panel } from "reactflow";

const ActionPanel = React.memo(() => {
  const { spacing } = useTheme();
  return (
    <Panel position="top-center">
      <Paper sx={{ padding: spacing(0.5) }} elevation={3}>
        <IconButton color="success">
          <MdPlayArrow size={spacing(2.5)} />
        </IconButton>
      </Paper>
    </Panel>
  );
});

export default ActionPanel;
