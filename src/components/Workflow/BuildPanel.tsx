import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();
  return (
    <Button
      onClick={onClick}
      variant={isSelected ? "contained" : "outlined"}
      sx={{
        minWidth: 0,
        padding: theme.spacing(1.5),
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
  const theme = useTheme();
  const { buildType, setBuildType } = useWorkflow();
  return (
    <Panel position="bottom-center">
      <Paper>
        <BuildButton
          onClick={() => setBuildType("fc:input")}
          isSelected={buildType === "fc:input"}
        >
          <ImEnter size={theme.spacing(2.5)} />
        </BuildButton>
        <BuildButton
          onClick={() => setBuildType("fc:robot")}
          isSelected={buildType === "fc:robot"}
        >
          <RiRobot2Line size={theme.spacing(2.5)} />
        </BuildButton>
        <BuildButton
          onClick={() => setBuildType("fc:output")}
          isSelected={buildType === "fc:output"}
        >
          <ImExit size={theme.spacing(2.5)} />
        </BuildButton>
      </Paper>
    </Panel>
  );
});

export default BuildPanel;
