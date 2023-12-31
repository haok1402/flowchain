import React from "react";
import { createContext, useContext } from "react";
import { useCallback, useMemo, useState } from "react";
import {
  Node,
  NodeAddChange,
  OnNodesChange,
  applyNodeChanges,
} from "reactflow";
import { Edge, OnEdgesChange, applyEdgeChanges } from "reactflow";
import { OnConnect, addEdge } from "reactflow";
import { NodeTypes } from "reactflow";
import { useReactFlow } from "reactflow";

import SourceNode from "@components/Workflow/Nodes/Source";
import TargetNode from "@components/Workflow/Nodes/Target";
import { NodeData as SourceNodeData } from "@shared/workflow/nodes/source";
import { NodeData as TargetNodeData } from "@shared/workflow/nodes/target";

export type NodeData = SourceNodeData | TargetNodeData;
export type BuildType = "source" | "robot" | "target";

const WorkflowContext = createContext<{
  nodes: Node<NodeData>[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;

  nodeTypes: NodeTypes;
  buildType: BuildType;
  setBuildType: React.Dispatch<React.SetStateAction<BuildType>>;
  onClick: React.MouseEventHandler<HTMLDivElement>;
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
  onClick: () => {},
});

const initialNodes: Node<NodeData>[] = [
  {
    id: "1",
    data: {
      label: "My Resume",
      status: "Editing",
      request: {
        type: "website",
        payload: {
          url: "https://hao-kang.web.app/",
        },
      },
      response: {
        text: "",
      },
    },
    type: "source",
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: {
      label: "Cover Letter",
      status: "Editing",
      request: {},
      response: {
        text: "",
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

  const [buildType, setBuildType] = useState<BuildType>("source");

  const { screenToFlowPosition } = useReactFlow();
  const onClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.ctrlKey) {
        const nodeId = `${nodes.length + 1}`;
        const nodePosition = screenToFlowPosition({
          x: e.clientX,
          y: e.clientY,
        });
        switch (buildType) {
          case "source":
            const NewSource: NodeAddChange<SourceNodeData> = {
              type: "add",
              item: {
                id: nodeId,
                position: nodePosition,
                data: {
                  label: "New Source",
                  status: "Editing",
                  request: {
                    type: "document",
                    payload: {
                      ref: "",
                    },
                  },
                  response: {
                    text: "",
                  },
                },
                type: "source",
              },
            };
            onNodesChange([NewSource]);
            break;
          case "target":
            const NewTarget: NodeAddChange<TargetNodeData> = {
              type: "add",
              item: {
                id: nodeId,
                position: nodePosition,
                data: {
                  label: "New Target",
                  status: "Editing",
                  request: {},
                  response: {
                    text: "",
                  },
                },
                type: "target",
              },
            };
            onNodesChange([NewTarget]);
            break;
        }
      }
    },
    [nodes, buildType, onNodesChange, screenToFlowPosition],
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
        onClick,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => useContext(WorkflowContext);
