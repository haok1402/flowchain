import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Fade from "react-bootstrap/Fade";
import { TypeAnimation } from "react-type-animation";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  OnNodesChange,
  Position,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import "../assets/styles/diagram.scss";
import "../assets/styles/landing.scss";
import NavBar from "../components/NavBar";
import { useAnimte } from "../contexts/Animate";

const Headline = React.memo(() => {
  const { showNavItems, setShowNavItems } = useAnimte();
  const { showFlowDiagram, setShowFlowDiagram } = useAnimte();
  const { showKeyFeatures, setShowKeyFeatures } = useAnimte();
  return (
    <Container className="landing-headline">
      {showNavItems || showFlowDiagram || showKeyFeatures ? (
        <span className="h1">
          {"Build your AI-powered, automated\nworkflow in minutes! 🚀"}
        </span>
      ) : (
        <TypeAnimation
          speed={70}
          cursor={false}
          sequence={[
            "Build your AI-powered, automated\nworkflow in minutes! 🚀",
            500,
            () => setShowNavItems(true),
            500,
            () => setShowFlowDiagram(true),
            500,
            () => setShowKeyFeatures(true),
          ]}
          className="h1"
        />
      )}
    </Container>
  );
});

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

const Diagram = React.memo(() => {
  const { showFlowDiagram } = useAnimte();
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges] = useState<Edge[]>(initialEdges);
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) =>
        applyNodeChanges(
          changes.filter((change) => change.type !== "remove"),
          nds,
        ),
      );
    },
    [setNodes],
  );
  return (
    <Fade in={showFlowDiagram}>
      <Container className="landing-flowchain">
        {showFlowDiagram && (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodesDraggable={true}
            nodesConnectable={false}
            edgesUpdatable={false}
            onNodesChange={onNodesChange}
            proOptions={{ hideAttribution: true }}
            zoomOnScroll={false}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} />
          </ReactFlow>
        )}
      </Container>
    </Fade>
  );
});

const Features = React.memo(() => {
  const { showKeyFeatures } = useAnimte();
  return (
    <Fade in={showKeyFeatures}>
      <Container className="landing-features">
        {showKeyFeatures && (
          <div>
            <h1 style={{ textAlign: "center" }}>Key Features</h1>
          </div>
        )}
      </Container>
    </Fade>
  );
});

const Landing = React.memo(() => {
  return (
    <>
      <NavBar />
      <Headline />
      <Diagram />
      <Features />
    </>
  );
});

export default Landing;
