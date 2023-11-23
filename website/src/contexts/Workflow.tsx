import React, { createContext, useCallback, useContext, useState } from "react";
import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "reactflow";

const WorkflowContext = createContext<{
  selectedTool: string;
  setSelectedTool: React.Dispatch<React.SetStateAction<string>>;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  handleOnClick: React.MouseEventHandler;
}>({
  selectedTool: "Input",
  setSelectedTool: () => {},
  nodes: [],
  edges: [],
  onNodesChange: () => {},
  onEdgesChange: () => {},
  onConnect: () => {},
  handleOnClick: () => {},
});

const WorkflowProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState("Input");

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const { screenToFlowPosition } = useReactFlow();

  const handleOnClick = (event: React.MouseEvent) => {
    if (!event.ctrlKey) {
      return;
    }
    switch (selectedTool) {
      case "Input":
        onNodesChange([
          {
            type: "add",
            item: {
              id: `${nodes.length}`,
              position: screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
              }),
              data: { label: "Input" },
              type: "input",
            },
          },
        ]);
        break;
      case "Robot":
        onNodesChange([
          {
            type: "add",
            item: {
              id: `${nodes.length}`,
              position: screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
              }),
              data: { label: "Robot" },
              type: "default",
            },
          },
        ]);
        break;
      case "Output":
        onNodesChange([
          {
            type: "add",
            item: {
              id: `${nodes.length}`,
              position: screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
              }),
              data: { label: "Output" },
              type: "output",
            },
          },
        ]);
        break;
    }
  };

  return (
    <WorkflowContext.Provider
      value={{
        selectedTool,
        setSelectedTool,
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        handleOnClick,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

const useWorkflow = () => useContext(WorkflowContext);

export { WorkflowProvider, useWorkflow };
