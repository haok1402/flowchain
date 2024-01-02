import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import React, { useCallback } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Panel } from "reactflow";

import { useDialog } from "src/contexts/Dialog";
import { useFirebase } from "src/contexts/Firebase";

const ActionPanel = React.memo(() => {
  const { spacing } = useTheme();
  const { user } = useFirebase();
  const { triggerAuthDialog } = useDialog();

  const handlePlayOnClick = useCallback(() => {
    if (!user) {
      triggerAuthDialog();
    }
  }, [user, triggerAuthDialog]);

  return (
    <Panel position="top-center">
      <Paper sx={{ padding: spacing(0.5) }} elevation={3}>
        <IconButton color="success" onClick={handlePlayOnClick}>
          <MdPlayArrow size={spacing(2.5)} />
        </IconButton>
      </Paper>
    </Panel>
  );
});

export default ActionPanel;
