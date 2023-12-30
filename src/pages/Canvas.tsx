import styled from "@emotion/styled";
import { Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/system/Box";
import React from "react";
import ReactFlow from "reactflow";
import { Background, BackgroundVariant } from "reactflow";

import ActionPanel from "src/components/Workflow/ActionPanel";
import BuildPanel from "src/components/Workflow/BuildPanel";
import ProfilePanel from "src/components/Workflow/ProfilePanel";
import { useWorkflow } from "src/contexts/Workflow";

const StyledReactFlow = styled(ReactFlow)<{ theme: Theme }>`
  .react-flow__attribution {
    background-color: ${({ theme }) => theme.palette.background.default};
  }
`;

const Canvas = React.memo(() => {
  const theme = useTheme();
  const { nodes, edges } = useWorkflow();
  const { onNodesChange, onEdgesChange, onConnect } = useWorkflow();
  const { nodeTypes } = useWorkflow();
  return (
    <Box style={{ width: "100vw", height: "100vh" }}>
      <StyledReactFlow
        theme={theme}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ maxZoom: 1 }}
      >
        <ProfilePanel />
        <BuildPanel />
        <ActionPanel />
        <Background variant={BackgroundVariant.Dots} />
      </StyledReactFlow>
    </Box>
  );
});

export default Canvas;
