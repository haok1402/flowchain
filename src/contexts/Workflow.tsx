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

import { SourceNode, SourceNodeData } from "src/components/Workflow/Nodes";
import { TargetNode, TargetNodeData } from "src/components/Workflow/Nodes";

const WorkflowContext = createContext<{
  nodes: Node<SourceNodeData | TargetNodeData>[];
  edges: Edge[];
  setNodes: React.Dispatch<
    React.SetStateAction<Node<SourceNodeData | TargetNodeData>[]>
  >;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;

  nodeTypes: NodeTypes;
  buildType: "source" | "robot" | "target";
  setBuildType: React.Dispatch<
    React.SetStateAction<"source" | "robot" | "target">
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
  buildType: "source",
  setBuildType: () => {},
});

const initialNodes: Node<SourceNodeData | TargetNodeData>[] = [
  {
    id: "1",
    data: {
      title: "Source",
      source: "website",
      payload: {
        websiteLink: "https://airtable.com/appdHqjbBabD5YW37/shrmPt6bz1wCkrplO",
      },
    },
    type: "source",
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: {
      title: "Target",
      payload: {
        response: "",
      },
    },
    type: "target",
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
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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
      source: SourceNode,
      target: TargetNode,
    }),
    [],
  );
  const [buildType, setBuildType] = useState<"source" | "robot" | "target">(
    "source",
  );

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
