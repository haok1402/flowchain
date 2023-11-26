import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import { Panel, useKeyPress } from "reactflow";

import BuildItem from "src/components/Workflow/BuildItem";
import { useWorkflow } from "src/contexts/Workflow";

const BuildPanel = React.memo(() => {
  const { setBuildItemType } = useWorkflow();

  const pressedQ = useKeyPress(["q", "Q"]);
  useEffect(() => {
    if (pressedQ) {
      setBuildItemType("Input");
    }
  }, [pressedQ, setBuildItemType]);

  const pressedW = useKeyPress(["w", "W"]);
  useEffect(() => {
    if (pressedW) {
      setBuildItemType("Format");
    }
  }, [pressedW, setBuildItemType]);

  const pressedE = useKeyPress(["e", "E"]);
  useEffect(() => {
    if (pressedE) {
      setBuildItemType("Robot");
    }
  }, [pressedE, setBuildItemType]);

  const pressedR = useKeyPress(["r", "R"]);
  useEffect(() => {
    if (pressedR) {
      setBuildItemType("Output");
    }
  }, [pressedR, setBuildItemType]);

  return (
    <Panel
      position="bottom-center"
      onClick={(event) => event.stopPropagation()}
    >
      <Paper id="Workflow__BuildPanel" elevation={3}>
        <BuildItem itemType="Input" />
        <BuildItem itemType="Format" />
        <BuildItem itemType="Robot" />
        <BuildItem itemType="Output" />
      </Paper>
    </Panel>
  );
});

export default BuildPanel;
