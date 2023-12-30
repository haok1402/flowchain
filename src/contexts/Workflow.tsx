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
import { OutputNode } from "src/components/Workflow/Nodes";

const WorkflowContext = createContext<{
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
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
  setNodes: () => {},
  setEdges: () => {},
  onNodesChange: () => {},
  onEdgesChange: () => {},
  onConnect: () => {},

  nodeTypes: {},
  buildType: "fc:input",
  setBuildType: () => {},
});

const initialNodes: Node[] = [
  {
    id: "1",
    data: {
      title: "Source",
      source: "document",
      payload: {
        websiteLink: "",
      },
    },
    type: "fc:input",
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: {
      title: "Target",
    },
    type: "fc:output",
    position: { x: window.innerWidth / 2, y: -window.innerHeight / 4 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
  },
];

export const WorkflowProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
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
      "fc:output": OutputNode,
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
        setNodes,
        setEdges,
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

export const useWorkflow = () => useContext(WorkflowContext);
