import Autocomplete from "@mui/material/Autocomplete";
import Box, { BoxProps } from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Handle, Position } from "reactflow";

import NodeHeader from "src/components/Workflow/NodeHeader";

export interface RobotNodeDataProps {
  id: string;
  name: string;
  type: string;
  source: string;
}

export const RobotOptions = {
  Text: ["gpt-3.5-turbo"],
};

interface NodeBodyProps extends BoxProps {
  robotType: string;
  setRobotType: React.Dispatch<React.SetStateAction<string>>;
  robotSource: string;
  setRobotSource: React.Dispatch<React.SetStateAction<string>>;
}

const NodeBody: React.FC<NodeBodyProps> = React.memo(
  ({ robotType, setRobotType, robotSource, setRobotSource }) => {
    return (
      <Box
        sx={{
          paddingTop: 3,
          paddingLeft: 2,
          paddingRight: 2,
          paddingBottom: 3,
        }}
      >
        <Autocomplete
          disableClearable
          disablePortal
          className="nodrag"
          value={robotType}
          options={Object.keys(RobotOptions)}
          onChange={(_, newValue) => {
            setRobotType(newValue || "");
            setRobotSource(
              RobotOptions[newValue as keyof typeof RobotOptions][0],
            );
          }}
          sx={{ marginBottom: 3 }}
          renderInput={(params) => <TextField {...params} label="Type" />}
          PaperComponent={({ children }) => (
            <Paper className="nodrag">{children}</Paper>
          )}
        />
        <Autocomplete
          disableClearable
          disablePortal
          className="nodrag"
          value={robotSource}
          options={RobotOptions[robotType as keyof typeof RobotOptions]}
          onChange={(_, newValue) => {
            setRobotSource(newValue || "");
          }}
          renderInput={(params) => <TextField {...params} label="Source" />}
          PaperComponent={({ children }) => (
            <Paper className="nodrag">{children}</Paper>
          )}
        />
      </Box>
    );
  },
);

interface RobotNodeProps {
  data: RobotNodeDataProps;
}

const RobotNode: React.FC<RobotNodeProps> = React.memo(({ data }) => {
  const [name, setName] = useState(data.name);
  const [editableName, setEditableName] = useState(false);
  const [robotType, setRobotType] = useState("Text");
  const [robotSource, setRobotSource] = useState("gpt-3.5-turbo");
  return (
    <>
      <Paper elevation={3} sx={{ minWidth: "300px" }}>
        <NodeHeader
          name={name}
          setName={setName}
          editableName={editableName}
          setEditableName={setEditableName}
        />
        <NodeBody
          robotType={robotType}
          setRobotType={setRobotType}
          robotSource={robotSource}
          setRobotSource={setRobotSource}
        />
      </Paper>
    </>
  );
});

export default RobotNode;
