import Box from "@mui/system/Box";
import React from "react";
import ReactFlow from "reactflow";
import { Background, BackgroundVariant } from "reactflow";

import BuildPanel from "src/components/Workflow/BuildPanel";

const Workflow = React.memo(() => {
  return (
    <Box style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow proOptions={{ hideAttribution: true }}>
        <BuildPanel />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </Box>
  );
});

export default Workflow;
