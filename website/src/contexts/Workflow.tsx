import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Edge, Node, useReactFlow } from "reactflow";
import { OnNodesChange } from "reactflow";
import { OnEdgesChange } from "reactflow";
import { OnConnect, addEdge } from "reactflow";
import { useEdgesState, useNodesState } from "reactflow";
import { NodeTypes } from "reactflow";

import InputNode, {
  InputNodeDataProps,
  InputSource,
  InputType,
} from "src/components/Workflow/InputNode";

const WorkflowContext = createContext<{
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onConnect: OnConnect;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;

  buildItemType: string;
  setBuildItemType: (itemType: string) => void;
  handleOnClick: React.MouseEventHandler<HTMLDivElement>;
  supportedNodeTypes: NodeTypes;
}>({
  nodes: [],
  edges: [],
  setNodes: () => {},
  setEdges: () => {},
  onConnect: () => {},
  onNodesChange: () => {},
  onEdgesChange: () => {},

  buildItemType: "Input",
  setBuildItemType: () => {},
  handleOnClick: () => {},
  supportedNodeTypes: {},
});

const WorkflowProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const [buildItemType, setBuildItemType] = useState<string>("Input");

  const { screenToFlowPosition } = useReactFlow();

  const supportedNodeTypes = useMemo(() => ({ InputNode }), []);

  const handleOnClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!e.ctrlKey) return;
      switch (buildItemType) {
        case "Input":
          onNodesChange([
            {
              type: "add",
              item: {
                id: `${nodes.length}`,
                position: screenToFlowPosition({
                  x: e.clientX,
                  y: e.clientY,
                }),
                data: {
                  id: `${nodes.length}`,
                  type: InputType[0],
                  source:
                    InputSource[InputType[0] as keyof typeof InputSource][0],
                  label: "New Input",
                } as InputNodeDataProps,
                type: "InputNode",
              },
            },
          ]);
      }
    },
    [buildItemType, nodes, screenToFlowPosition, onNodesChange],
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
        buildItemType,
        setBuildItemType,
        handleOnClick,
        supportedNodeTypes,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

const useWorkflow = () => useContext(WorkflowContext);

export { WorkflowProvider, useWorkflow };
