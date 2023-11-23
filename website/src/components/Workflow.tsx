import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/system/Box";
import React from "react";
import { LuFileInput, LuFileOutput } from "react-icons/lu";
import { RiRobot2Line } from "react-icons/ri";
import { RxHand } from "react-icons/rx";
import ReactFlow, { Background, BackgroundVariant, Panel } from "reactflow";

import "reactflow/dist/style.css";
import "src/components/Workflow.css";
import { useWorkflow } from "src/contexts/Workflow";

const ToolPanel = React.memo(() => {
  const { selectedTool, setSelectedTool } = useWorkflow();
  return (
    <Panel
      position="bottom-center"
      onClick={(event) => event.stopPropagation()}
    >
      <Paper className="Workflow__Panel" elevation={3}>
        <Button
          variant={selectedTool === "Input" ? "contained" : "text"}
          onClick={() => setSelectedTool("Input")}
          className="Workflow__PanelButton"
          title="Input"
        >
          <LuFileInput className="Workflow__PanelButtonIcon" />
        </Button>
        <Button
          variant={selectedTool === "Robot" ? "contained" : "text"}
          onClick={() => setSelectedTool("Robot")}
          className="Workflow__PanelButton"
          title="Robot"
        >
          <RiRobot2Line className="Workflow__PanelButtonIcon" />
        </Button>
        <Button
          variant={selectedTool === "Output" ? "contained" : "text"}
          onClick={() => setSelectedTool("Output")}
          className="Workflow__PanelButton"
          title="Output"
        >
          <LuFileOutput className="Workflow__PanelButtonIcon" />
        </Button>
      </Paper>
    </Panel>
  );
});

const Workflow = React.memo(() => {
  const { nodes, edges } = useWorkflow();
  const { onNodesChange, onEdgesChange } = useWorkflow();
  const { onConnect } = useWorkflow();
  const { handleOnClick } = useWorkflow();
  return (
    <Box id="Workflow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={{ hideAttribution: true }}
        onConnect={onConnect}
        onClick={handleOnClick}
      >
        <ToolPanel />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </Box>
  );
});

export default Workflow;
