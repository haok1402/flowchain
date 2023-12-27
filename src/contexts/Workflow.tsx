import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Node, OnNodesChange, applyNodeChanges } from "reactflow";
import { Edge, OnEdgesChange, applyEdgeChanges } from "reactflow";
import { OnConnect, addEdge } from "reactflow";
import { NodeTypes } from "reactflow";

import { InputNode } from "src/components/Workflow/Nodes";

const WorkflowContext = createContext<{
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;

  nodeTypes: NodeTypes;
  buildType: "fc:input" | "fc:robot" | "fc:output";
  setBuildType: React.Dispatch<
    React.SetStateAction<"fc:input" | "fc:robot" | "fc:output">
  >;
}>({
  nodes: [],
  edges: [],
  onNodesChange: () => {},
  onEdgesChange: () => {},
  onConnect: () => {},

  nodeTypes: {},
  buildType: "fc:input",
  setBuildType: () => {},
});

const initialNodes: Node[] = [
  // { id: "1", data: { label: "Node 1" }, position: { x: 5, y: 5 } },
  // { id: "2", data: { label: "Node 2" }, position: { x: 5, y: 100 } },
  {
    id: "1",
    data: {
      label: "Input Node",
    },
    type: "fc:input",
    position: { x: 0, y: 0 },
  },
];

const initialEdges: Edge[] = [
  // { id: "e1-2", source: "1", target: "2" }
];

const WorkflowProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

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

  const nodeTypes = useMemo(
    () => ({
      "fc:input": InputNode,
    }),
    [],
  );
  const [buildType, setBuildType] = useState<
    "fc:input" | "fc:robot" | "fc:output"
  >("fc:input");

  return (
    <WorkflowContext.Provider
      value={{
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,

        nodeTypes,
        buildType,
        setBuildType,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

const useWorkflow = () => useContext(WorkflowContext);

export { WorkflowProvider, useWorkflow };