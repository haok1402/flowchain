import { useTheme } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/system/Box";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Handle, Position } from "reactflow";

import { useWorkflow } from "src/contexts/Workflow";

export interface InputNodeDataProps {
  id: string;
  name: string;
  type: string;
  source: string;
}

interface InputNodeProps {
  data: InputNodeDataProps;
}

export const InputOptions = {
  Text: ["Type Manually", "Upload from Device", "Fetch from URL"],
  Image: ["Upload from Device", "Fetch from URL"],
};

interface NodeHeaderProps extends BoxProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  editableName: boolean;
  setEditableName: React.Dispatch<React.SetStateAction<boolean>>;
}

const NodeHeader: React.FC<NodeHeaderProps> = React.memo(
  ({ name, setName, editableName, setEditableName }) => {
    const theme = useTheme();
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1,
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        }}
      >
        {editableName ? (
          <TextField
            variant="standard"
            value={name}
            InputProps={{
              autoComplete: "off",
              autoFocus: true,
              disableUnderline: true,
            }}
            sx={{
              input: {
                ...theme.typography.body1,
                color: theme.palette.primary.contrastText,
                fontWeight: theme.typography.fontWeightBold,
              },
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                setEditableName(false);
              }
            }}
            onBlur={() => setEditableName(false)}
            onChange={(event) => setName(event.target.value)}
          />
        ) : (
          <Typography
            style={{
              color: theme.palette.primary.contrastText,
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            {name}
          </Typography>
        )}
        <MdEdit
          style={{ fontSize: "1.25rem", cursor: "pointer" }}
          onClick={() => setEditableName(true)}
        />
      </Box>
    );
  },
);

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
