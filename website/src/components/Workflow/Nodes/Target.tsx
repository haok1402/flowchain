import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React, { useCallback, useEffect, useState } from "react";
import { ImExit } from "react-icons/im";
import { MdClose, MdHelp } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { Handle, Position } from "reactflow";
import { Node, NodeProps } from "reactflow";
import { getConnectedEdges } from "reactflow";

import { useWorkflow } from "@contexts/Workflow";
import { NodeData } from "@contexts/Workflow";
import { NodeData as TargetNodeData } from "@shared/workflow/nodes/target";

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

interface TargetNodeProps extends NodeProps {
  data: TargetNodeData;
}

const TargetNode: React.FC<TargetNodeProps> = React.memo(({ id, data }) => {
  const { spacing, palette } = useTheme();

  const [label, setLabel] = useState(data.label);
  const handleLabelOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(e.target.value);
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
          };
        }
        return node;
      }),
    );
  }, [id, setNodes, label]);

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
      <Handle type="target" position={Position.Left} />
      <Card sx={{ width: spacing(45) }}>
        <CardHeader
          avatar={<ImExit />}
          title={
            <CardLabel
              label={label}
              handleLabelOnChange={handleLabelOnChange}
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
          {data.response.text === "" ? (
            <>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </>
          ) : (
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {JSON.stringify(data.response.text)}
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
});

export default TargetNode;
