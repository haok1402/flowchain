import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box, { BoxProps } from "@mui/system/Box";
import React, { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

import NodeHeader from "src/components/Workflow/NodeHeader";
import { useWorkflow } from "src/contexts/Workflow";

export interface InputNodeDataProps {
  id: string;
  name: string;
  type: string;
  source: string;
}

export const InputOptions = {
  Text: ["Type Manually", "Upload from Device", "Fetch from URL"],
  Image: ["Upload from Device", "Fetch from URL"],
};

interface NodeBodyProps extends BoxProps {
  inputType: string;
  setInputType: React.Dispatch<React.SetStateAction<string>>;
  inputSource: string;
  setInputSource: React.Dispatch<React.SetStateAction<string>>;
}

const NodeBody: React.FC<NodeBodyProps> = React.memo(
  ({ inputType, setInputType, inputSource, setInputSource }) => {
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
          value={inputType}
          options={Object.keys(InputOptions)}
          onChange={(_, newValue) => {
            setInputType(newValue || "");
            setInputSource(
              InputOptions[newValue as keyof typeof InputOptions][0],
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
          value={inputSource}
          options={InputOptions[inputType as keyof typeof InputOptions]}
          onChange={(_, newValue) => {
            setInputSource(newValue || "");
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

interface InputNodeProps {
  data: InputNodeDataProps;
}

const InputNode: React.FC<InputNodeProps> = React.memo(({ data }) => {
  const [name, setName] = useState(data.name);
  const [editableName, setEditableName] = useState(false);
  const [inputType, setInputType] = useState("Text");
  const [inputSource, setInputSource] = useState("Type Manually");

  const { setNodes } = useWorkflow();
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === data.id) {
          node.data = {
            ...node.data,
            name: name,
            type: inputType,
            source: inputSource,
          };
        }
        return node;
      }),
    );
  }, [setNodes, data.id, name, inputType, inputSource]);

  return (
    <>
      <Handle type="source" position={Position.Right} />
      <Paper elevation={3} sx={{ minWidth: "300px" }}>
        <NodeHeader
          name={name}
          setName={setName}
          editableName={editableName}
          setEditableName={setEditableName}
        />
        <NodeBody
          inputType={inputType}
          setInputType={setInputType}
          inputSource={inputSource}
          setInputSource={setInputSource}
        />
      </Paper>
    </>
  );
});

export default InputNode;
