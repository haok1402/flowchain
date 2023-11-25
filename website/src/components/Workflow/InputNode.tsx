import { useTheme } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/system/Box";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Handle, Position } from "reactflow";
import styled from "styled-components";

import { useWorkflow } from "src/contexts/Workflow";

export interface InputNodeDataProps {
  id: string;
  type: string;
  source: string;
  label: string;
}

interface InputNodeProps {
  data: InputNodeDataProps;
}

export const InputType = ["Text", "Image"];

export const InputSource = {
  Text: ["Type Manually", "Upload from Device", "Fetch from URL"],
  Image: ["Upload from Device", "Fetch from URL"],
};

const NodeHeader = styled(Box)<BoxProps>(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const NodeBody = styled(Box)<BoxProps>(() => ({}));

const InputNode: React.FC<InputNodeProps> = React.memo(({ data }) => {
  const theme = useTheme();
  const [name, setName] = useState(data.label);
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [inputType, setInputType] = useState("Text");
  const [inputSource, setInputSource] = useState("Type Manually");

  const { setNodes } = useWorkflow();
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === data.id) {
          node.data = {
            ...node.data,
            label: name,
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
      <Handle type="target" position={Position.Right} />
      <Paper elevation={3} sx={{ minWidth: "300px" }}>
        <NodeHeader
          sx={{
            padding: 1,
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
          }}
        >
          {isNameEditable ? (
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
                  setIsNameEditable(false);
                }
              }}
              onBlur={() => setIsNameEditable(false)}
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
            onClick={() => setIsNameEditable(true)}
          />
        </NodeHeader>
        <NodeBody
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
            options={InputType}
            onChange={(_, newValue) => {
              setInputType(newValue || "");
              setInputSource(
                InputSource[newValue as keyof typeof InputSource][0],
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
            options={InputSource[inputType as keyof typeof InputSource]}
            onChange={(_, newValue) => {
              setInputSource(newValue || "");
            }}
            renderInput={(params) => <TextField {...params} label="Source" />}
            PaperComponent={({ children }) => (
              <Paper className="nodrag">{children}</Paper>
            )}
          />
        </NodeBody>
      </Paper>
    </>
  );
});

export default InputNode;
