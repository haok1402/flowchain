import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import React, { useCallback, useEffect, useState } from "react";
import { ImEnter } from "react-icons/im";
import { MdCloudUpload } from "react-icons/md";
import { Handle, Position } from "reactflow";
import { NodeProps } from "reactflow";

import { NodeAction, NodeLabel } from "@components/Workflow/Nodes/Shared";
import { useWorkflow } from "@contexts/Workflow";
import { NodeData as SourceNodeData } from "@shared/workflow/nodes/source";

interface SourceNodeProps extends NodeProps {
  data: SourceNodeData;
}

const SourceNode: React.FC<SourceNodeProps> = React.memo(({ id, data }) => {
  const { spacing, palette } = useTheme();

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
            request:
              type === "document"
                ? { type, payload: { ref } }
                : { type, payload: { url } },
          };
        }
        return node;
      }),
    );
  }, [id, type, url, ref, setNodes]);

  return (
    <>
      <Handle type="source" position={Position.Right} />
      <Card sx={{ width: spacing(45) }}>
        <CardHeader
          avatar={<ImEnter />}
          title={<NodeLabel id={id} data={data} />}
          subheader="Extract text from a given source."
          action={<NodeAction id={id} data={data} />}
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
