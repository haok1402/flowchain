import Paper from "@mui/material/Paper";
import React from "react";

import NodeHeader from "src/components/Workflow/NodeHeader";

export interface GPT35TurboParams {
  system: string;
  prompt: string;
}

export interface GPT4TurboParams {
  system: string;
  prompt: string;
}

export interface RobotNodeDataProps {
  id: string;
  name: string;
  type: string;
  source: string;
  params: GPT35TurboParams | GPT4TurboParams;
}

interface RobotNodeProps {
  data: RobotNodeDataProps;
}

const RobotNode: React.FC<RobotNodeProps> = React.memo(({ data }) => {
  const [name, setName] = React.useState(data.name);
  const [editableName, setEditableName] = React.useState(false);

  return (
    <>
      <Paper elevation={3} sx={{ minWidth: "300px" }}>
        <NodeHeader
          name={name}
          setName={setName}
          editableName={editableName}
          setEditableName={setEditableName}
        />
      </Paper>
    </>
  );
});

export default RobotNode;
