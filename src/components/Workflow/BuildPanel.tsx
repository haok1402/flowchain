import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import React from "react";
import { ImEnter, ImExit } from "react-icons/im";
import { RiRobot2Line } from "react-icons/ri";
import { Panel } from "reactflow";

import { useWorkflow } from "src/contexts/Workflow";

const BuildButton: React.FC<
  React.PropsWithChildren<{
    isSelected: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }>
> = React.memo(({ children, isSelected, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant={isSelected ? "contained" : "outlined"}
      sx={{
        minWidth: 0,
        padding: "0.75rem",
        border: "none",
        "&:hover": {
          border: "none",
        },
      }}
    >
      {children}
    </Button>
  );
});

const BuildPanel = React.memo(() => {
  const { buildType, setBuildType } = useWorkflow();
  return (
    <Panel position="bottom-center">
      <Paper elevation={3}>
        <BuildButton
          onClick={() => setBuildType("fc:input")}
          isSelected={buildType === "fc:input"}
        >
          <ImEnter size="1.25rem" />
        </BuildButton>
        <BuildButton
          onClick={() => setBuildType("fc:robot")}
          isSelected={buildType === "fc:robot"}
        >
          <RiRobot2Line size="1.25rem" />
        </BuildButton>
        <BuildButton
          onClick={() => setBuildType("fc:output")}
          isSelected={buildType === "fc:output"}
        >
          <ImExit size="1.25rem" />
        </BuildButton>
      </Paper>
    </Panel>
  );
});

export default BuildPanel;
