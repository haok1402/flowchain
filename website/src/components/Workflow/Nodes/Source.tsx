import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React, { useCallback, useEffect, useState } from "react";
import { ImEnter } from "react-icons/im";
import { MdCloudUpload } from "react-icons/md";
import { MdClose, MdHelp } from "react-icons/md";
import { Handle, Position } from "reactflow";
import { Node, NodeProps } from "reactflow";
import { getConnectedEdges } from "reactflow";

import { useWorkflow } from "@contexts/Workflow";
import { NodeData } from "@contexts/Workflow";
import { NodeData as SourceNodeData } from "@shared/workflow/nodes/source";

interface CardTitleProps {
  label: string;
  handleLabelOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardLabel: React.FC<CardTitleProps> = React.memo(
  ({ label, handleLabelOnChange }) => {
    const { typography } = useTheme();
    const [editing, setEditing] = useState(false);

    return editing ? (
      <TextField
        fullWidth
        autoFocus
        autoComplete="off"
        variant="standard"
        value={label}
        onBlur={() => setEditing(false)}
        onChange={handleLabelOnChange}
        inputProps={{
          style: {
            padding: 0,
            fontSize: typography.body1.fontSize,
          },
        }}
      />
    ) : (
      <Typography onDoubleClick={() => setEditing(true)}>{label}</Typography>
    );
  },
);

interface CardActionProps {
  handleDeleteOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CardAction: React.FC<CardActionProps> = React.memo(
  ({ handleDeleteOnClick }) => {
    return (
      <Box>
        <IconButton>
          <MdHelp />
        </IconButton>
        <IconButton onClick={handleDeleteOnClick}>
          <MdClose />
        </IconButton>
      </Box>
    );
  },
);

interface SourceNodeProps extends NodeProps {
  data: SourceNodeData;
}

const SourceNode: React.FC<SourceNodeProps> = React.memo(({ id, data }) => {
  const { spacing, palette } = useTheme();

  const [label, setLabel] = useState(data.label);
  const handleLabelOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(e.target.value);
    },
    [],
  );

  const [type, setType] = useState(data.request.type);
  const handleTypeOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setType(e.target.value as "document" | "website");
    },
    [],
  );

  const [url, setUrl] = useState(
    data.request.type === "website" ? data.request.payload.url : "",
  );
  const handleUrlOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(e.target.value);
    },
    [],
  );

  const [ref, setRef] = useState(
    data.request.type === "document" ? data.request.payload.ref : "",
  );
  const handleRefOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRef(e.target.value);
    },
    [],
  );

  const { setNodes } = useWorkflow();
  useEffect(() => {
    setNodes((value) =>
      value.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            label,
            request:
              type === "document"
                ? { type, payload: { ref } }
                : { type, payload: { url } },
          };
        }
        return node;
      }),
    );
  }, [id, type, label, url, ref, setNodes]);

  const { nodes, edges, setEdges } = useWorkflow();
  const handleDeleteOnClick = useCallback(() => {
    let nodeToDelete = null;
    const newNodes = nodes.reduce((acc, node) => {
      if (node.id === id) {
        nodeToDelete = node;
      } else {
        acc.push(node);
      }
      return acc;
    }, [] as Node<NodeData>[]);
    if (nodeToDelete !== null) {
      setNodes(newNodes);
      const connectedEdges = getConnectedEdges([nodeToDelete], edges);
      const newEdges = edges.filter((edge) => !connectedEdges.includes(edge));
      setEdges(newEdges);
    }
  }, [id, nodes, edges, setNodes, setEdges]);

  return (
    <>
      <Handle type="source" position={Position.Right} />
      <Card sx={{ width: spacing(45) }}>
        <CardHeader
          avatar={<ImEnter />}
          title={
            <CardLabel
              label={label}
              handleLabelOnChange={handleLabelOnChange}
            />
          }
          subheader="Extract text from a given source."
          action={<CardAction handleDeleteOnClick={handleDeleteOnClick} />}
        />
        <CardContent>
          <FormControl fullWidth>
            <FormLabel
              sx={{
                "&.Mui-focused": {
                  color: palette.text.secondary,
                },
              }}
            >
              Source
            </FormLabel>
            <RadioGroup row value={type} onChange={handleTypeOnChange}>
              <FormControlLabel
                value="document"
                control={<Radio />}
                label="Document"
              />
              <FormControlLabel
                value="website"
                control={<Radio />}
                label="Website"
              />
            </RadioGroup>
          </FormControl>
          {type === "document" && (
            <FormControl fullWidth>
              <FormLabel>File</FormLabel>
              <Button
                component="label"
                variant="contained"
                startIcon={<MdCloudUpload />}
              >
                Upload File
                <input type="file" hidden />
              </Button>
            </FormControl>
          )}
          {type === "website" && (
            <FormControl fullWidth>
              <FormLabel>Link</FormLabel>
              <TextField
                fullWidth
                autoFocus
                variant="standard"
                autoComplete="off"
                value={url}
                onChange={handleUrlOnChange}
              />
            </FormControl>
          )}
        </CardContent>
      </Card>
    </>
  );
});

export default SourceNode;
