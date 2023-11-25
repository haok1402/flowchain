import Box from "@mui/system/Box";
import React from "react";
import ReactFlow, { Background, BackgroundVariant } from "reactflow";

import "reactflow/dist/style.css";
import BuildPanel from "src/components/Workflow/BuildPanel";
import { useWorkflow } from "src/contexts/Workflow";

const Workflow = React.memo(() => {
  const { nodes, edges } = useWorkflow();
  const { onConnect, onNodesChange, onEdgesChange } = useWorkflow();
  const { handleOnClick, supportedNodeTypes } = useWorkflow();
  return (
    <Box style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={{ hideAttribution: true }}
        onClick={handleOnClick}
        nodeTypes={supportedNodeTypes}
      >
        <BuildPanel />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </Box>
  );
});

export default Workflow;
