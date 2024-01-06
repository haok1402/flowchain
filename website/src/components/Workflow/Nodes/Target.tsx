import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { ImExit } from "react-icons/im";
import { MdContentCopy } from "react-icons/md";
import { Handle, Position } from "reactflow";
import { NodeProps } from "reactflow";

import {
  NodeAction,
  NodeLabel,
  NodeStatus,
} from "@components/Workflow/Nodes/Shared";
import { NodeData as TargetNodeData } from "@shared/workflow/nodes/target";

interface TargetNodeProps extends NodeProps {
  data: TargetNodeData;
}

const TargetNode: React.FC<TargetNodeProps> = React.memo(({ id, data }) => {
  const { spacing, palette } = useTheme();

  return (
    <NodeStatus id={id} data={data}>
      <Handle type="target" position={Position.Left} />
      <Card sx={{ width: spacing(45) }}>
        <CardHeader
          avatar={<ImExit />}
          title={<NodeLabel id={id} data={data} />}
          subheader="Display result of the workflow."
          action={<NodeAction id={id} data={data} />}
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
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(data.response.text);
              }}
            >
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
    </NodeStatus>
  );
});

export default TargetNode;
