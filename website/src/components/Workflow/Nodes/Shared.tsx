import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { MdClose, MdHelp } from "react-icons/md";
import { getConnectedEdges } from "reactflow";
import { Node } from "reactflow";

import { useWorkflow } from "@contexts/Workflow";
import { NodeData } from "@contexts/Workflow";

interface NodeLabelProps {
  id: string;
  data: NodeData;
}

export const NodeLabel: React.FC<NodeLabelProps> = React.memo(
  ({ id, data }) => {
    const { typography } = useTheme();

    const [editing, setEditing] = useState(false);
    const handleTypographyOnDoubleClick = useCallback(() => {
      setEditing(true);
    }, []);
    const handleTextFieldOnBlur = useCallback(() => {
      setEditing(false);
    }, []);

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
    }, [id, label, setNodes]);

    return editing ? (
      <TextField
        fullWidth
        autoFocus
        autoComplete="off"
        variant="standard"
        value={label}
        onBlur={handleTextFieldOnBlur}
        onChange={handleLabelOnChange}
        inputProps={{
          style: {
            padding: 0,
            fontSize: typography.body1.fontSize,
          },
        }}
      />
    ) : (
      <Typography onDoubleClick={handleTypographyOnDoubleClick}>
        {label}
      </Typography>
    );
  },
);

interface NodeActionProps {
  id: string;
  data: NodeData;
}

export const NodeAction: React.FC<NodeActionProps> = React.memo(({ id }) => {
  const { nodes, edges, setNodes, setEdges } = useWorkflow();
  const handleMdCloseOnClick = useCallback(() => {
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
    <Box>
      <IconButton>
        <MdHelp />
      </IconButton>
      <IconButton onClick={handleMdCloseOnClick}>
        <MdClose />
      </IconButton>
    </Box>
  );
});

interface NodeStatusProps {
  id: string;
  data: NodeData;
}

export const NodeStatus: React.FC<React.PropsWithChildren<NodeStatusProps>> =
  React.memo(({ id, data, children }) => {
    if (data.status === "Editing") {
      return <>{children}</>;
    }
    return (
      <Badge
        color={
          data.status === "Running"
            ? "primary"
            : data.status === "Completed"
              ? "success"
              : data.status === "Failed"
                ? "error"
                : "default"
        }
        badgeContent={data.status}
      >
        {children}
      </Badge>
    );
  });
