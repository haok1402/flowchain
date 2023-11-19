import React, { useCallback, useState } from "react";

import Fade from "react-bootstrap/Fade";
import Container from "react-bootstrap/Container";
import { TypeAnimation } from "react-type-animation";

import ReactFlow, {
  applyNodeChanges,
  Node,
  Edge,
  OnNodesChange,
  Background,
  BackgroundVariant,
  Controls,
  Position,
  MiniMap,
} from "reactflow";

import NavBar from "../components/NavBar";
import { useAnimte } from "../contexts/Animate";
import "reactflow/dist/style.css";
import "../assets/styles/landing.scss";
import "../assets/styles/diagram.scss";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    sourcePosition: Position.Right,
    data: { label: "Resume PDF" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "GPT-3.5 Turbo" },
    position: { x: 250, y: 50 },
  },
  {
    id: "3",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    data: { label: "Job Description" },
    position: { x: 0, y: 100 },
  },
  {
    id: "4",
    type: "output",
    targetPosition: Position.Left,
    data: { label: "Cover Letter" },
    position: { x: 500, y: 50 },
  },
  {
    id: "5",
    type: "input",
    sourcePosition: Position.Right,
    data: { label: "Job Post URL" },
    position: { x: -250, y: 50 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e3-2",
    source: "3",
    target: "2",
    animated: true,
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
  },
  {
    id: "e5-3",
    source: "5",
    target: "3",
    animated: true,
  },
];

const Headline = React.memo(() => {
  const { showNavItems, setShowNavItems } = useAnimte();
  const { showFlowDiagram, setShowFlowDiagram } = useAnimte();
  return (
    <Container>
      {showNavItems || showFlowDiagram ? (
        <span className="h1 landing-headline">
          {"Build your AI-powered, automated\nworkflow in minutes! 🚀"}
        </span>
      ) : (
        <TypeAnimation
          cursor={false}
          sequence={[
            "Build your AI-powered, automated\nworkflow in minutes! 🚀",
            500,
            () => setShowNavItems(true),
            500,
            () => setShowFlowDiagram(true),
          ]}
          className="h1 landing-headline"
        />
      )}
    </Container>
  );
});

const Landing = React.memo(() => {
  const { showFlowDiagram } = useAnimte();
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges] = useState<Edge[]>(initialEdges);
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  return (
    <>
      <NavBar />
      <Headline />
      <div style={{ userSelect: "none" }}>
        <Fade in={showFlowDiagram}>
          <div className="landing-diagram">
            {showFlowDiagram && (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodesDraggable={true}
                nodesConnectable={false}
                edgesUpdatable={false}
                onNodesChange={onNodesChange}
                zoomOnScroll={false}
                proOptions={{ hideAttribution: true }}
                fitView
              >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} />
              </ReactFlow>
            )}
          </div>
        </Fade>
      </div>
    </>
  );
});

export default Landing;
