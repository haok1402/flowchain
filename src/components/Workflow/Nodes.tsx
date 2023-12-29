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
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React, { useCallback, useEffect, useState } from "react";
import { ImEnter, ImExit } from "react-icons/im";
import { MdCloudUpload } from "react-icons/md";
import { MdClose, MdHelp } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { Handle, Position } from "reactflow";
import { Node, NodeProps } from "reactflow";
import { getConnectedEdges } from "reactflow";

import { useWorkflow } from "src/contexts/Workflow";

interface CardTitleProps {
  title: string;
  handleTitleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardTitle: React.FC<CardTitleProps> = React.memo(
  ({ title, handleTitleOnChange }) => {
    const { typography } = useTheme();
    const [editing, setEditing] = useState(false);

    return editing ? (
      <TextField
        fullWidth
        autoFocus
        autoComplete="off"
        variant="standard"
        value={title}
        onBlur={() => setEditing(false)}
        onChange={handleTitleOnChange}
        inputProps={{
          style: {
            padding: 0,
            fontSize: typography.body1.fontSize,
          },
        }}
      />
    ) : (
      <Typography onDoubleClick={() => setEditing(true)}>{title}</Typography>
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

export interface InputNodeData {
  title: string;
  source: "document" | "website";
  payload: { websiteLink: string };
}

interface InputNodeProps extends NodeProps {
  data: InputNodeData;
}

export const InputNode: React.FC<InputNodeProps> = React.memo(
  ({ id, data }) => {
    const { spacing, palette } = useTheme();

    const [title, setTitle] = useState(data.title);
    const handleTitleOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
      },
      [],
    );

    const [source, setSource] = useState(data.source);
    const handleSourceOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource(e.target.value as "document" | "website");
      },
      [],
    );

    const [websiteLink, setWebsiteLink] = useState(data.payload.websiteLink);
    const handleWebsiteLinkOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setWebsiteLink(e.target.value);
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
              title,
              source,
              payload: { websiteURL: websiteLink },
            };
          }
          return node;
        }),
      );
    }, [setNodes, id, title, source, websiteLink]);

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
      }, [] as Node[]);
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
        <Card elevation={3} sx={{ width: spacing(45) }}>
          <CardHeader
            avatar={<ImEnter />}
            title={
              <CardTitle
                title={title}
                handleTitleOnChange={handleTitleOnChange}
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
              <RadioGroup row value={source} onChange={handleSourceOnChange}>
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
            {source === "document" && (
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
            {source === "website" && (
              <FormControl fullWidth>
                <FormLabel>Link</FormLabel>
                <TextField
                  fullWidth
                  autoFocus
                  variant="standard"
                  autoComplete="off"
                  value={websiteLink}
                  onChange={handleWebsiteLinkOnChange}
                />
              </FormControl>
            )}
          </CardContent>
        </Card>
      </>
    );
  },
);

export interface OutputNodeData {
  title: string;
}

interface OutputNodeProps extends NodeProps {
  data: OutputNodeData;
}

export const OutputNode: React.FC<OutputNodeProps> = React.memo(
  ({ id, data }) => {
    const { spacing, palette } = useTheme();

    const [title, setTitle] = useState(data.title);
    const handleTitleOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
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
              title,
            };
          }
          return node;
        }),
      );
    }, [setNodes, id, title]);

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
      }, [] as Node[]);
      if (nodeToDelete !== null) {
        setNodes(newNodes);
        const connectedEdges = getConnectedEdges([nodeToDelete], edges);
        const newEdges = edges.filter((edge) => !connectedEdges.includes(edge));
        setEdges(newEdges);
      }
    }, [id, nodes, edges, setNodes, setEdges]);

    return (
      <>
        <Handle type="target" position={Position.Left} />
        <Card elevation={3} sx={{ width: spacing(45) }}>
          <CardHeader
            avatar={<ImExit />}
            title={
              <CardTitle
                title={title}
                handleTitleOnChange={handleTitleOnChange}
              />
            }
            subheader="Display result of the workflow."
            action={<CardAction handleDeleteOnClick={handleDeleteOnClick} />}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography color={palette.text.secondary}>Response</Typography>
              <IconButton>
                <MdContentCopy />
              </IconButton>
            </Box>
            <Typography>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  },
);
