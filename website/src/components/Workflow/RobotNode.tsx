import Autocomplete from "@mui/material/Autocomplete";
import Box, { BoxProps } from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Handle, Position } from "reactflow";

import NodeHeader from "src/components/Workflow/NodeHeader";

export interface RobotNodeDataProps {
  id: string;
  name: string;
  type: string;
  source: string;
}

export const RobotOptions = {
  Text: ["gpt-3.5-turbo", "gpt-4", "gpt-3.5-turbo-16k", "gpt-4-32k"],
};

interface NodeBodyProps extends BoxProps {
  robotType: string;
  setRobotType: React.Dispatch<React.SetStateAction<string>>;
  robotSource: string;
  setRobotSource: React.Dispatch<React.SetStateAction<string>>;
  system: string;
  setSystem: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const NodeBody: React.FC<NodeBodyProps> = React.memo(
  ({
    robotType,
    setRobotType,
    robotSource,
    setRobotSource,
    system,
    setSystem,
    prompt,
    setPrompt,
  }) => {
    return (
      <Box
        sx={{
          paddingTop: 3,
          paddingLeft: 2,
          paddingRight: 2,
          paddingBottom: 3,
        }}
      >
        <Autocomplete
          disableClearable
          disablePortal
          className="nodrag"
          value={robotType}
          options={Object.keys(RobotOptions)}
          onChange={(_, newValue) => {
            setRobotType(newValue || "");
            setRobotSource(
              RobotOptions[newValue as keyof typeof RobotOptions][0],
            );
          }}
          sx={{ marginBottom: 3 }}
          renderInput={(params) => <TextField {...params} label="Type" />}
          PaperComponent={({ children }) => (
            <Paper className="nodrag">{children}</Paper>
          )}
        />
        <Autocomplete
          disableClearable
          disablePortal
          className="nodrag"
          value={robotSource}
          options={RobotOptions[robotType as keyof typeof RobotOptions]}
          onChange={(_, newValue) => {
            setRobotSource(newValue || "");
          }}
          sx={{ marginBottom: 3 }}
          renderInput={(params) => <TextField {...params} label="Source" />}
          PaperComponent={({ children }) => (
            <Paper className="nodrag">{children}</Paper>
          )}
        />
        {(() => {
          switch (`${robotType}-${robotSource}`) {
            case "Text-gpt-3.5-turbo":
            case "Text-gpt-4":
            case "Text-gpt-3.5-turbo-16k":
            case "Text-gpt-4-32k":
              return (
                <>
                  <TextField
                    multiline
                    maxRows={25}
                    label="system"
                    className="nodrag"
                    value={system}
                    onChange={(e) => setSystem(e.target.value)}
                    sx={{ width: "100%", marginBottom: 3 }}
                  />
                  <TextField
                    multiline
                    maxRows={25}
                    label="prompt"
                    className="nodrag"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </>
              );
            default:
              return <></>;
          }
        })()}
      </Box>
    );
  },
);

interface RobotNodeProps {
  data: RobotNodeDataProps;
}

const RobotNode: React.FC<RobotNodeProps> = React.memo(({ data }) => {
  const [name, setName] = useState(data.name);
  const [editableName, setEditableName] = useState(false);
  const [robotType, setRobotType] = useState("Text");
  const [robotSource, setRobotSource] = useState("gpt-3.5-turbo");
  const [system, setSystem] = useState(
    [
      "You're a helpful assistant tasked with generating personalized cover letters.",
      "By analyzing the job description and applicant's resume, your mission is to craft compelling cover letters that showcase the candidate's qualifications, ensuring they stand out and align with the job requirements.",
    ].join("\n\n"),
  );
  const [prompt, setPrompt] = useState(
    [
      ["Job Description:", "{{ Job Description }}"].join("\n"),
      ["Candidate's Resume:", "{{ Candidate's Resume }}"].join("\n"),
    ].join("\n\n"),
  );
  return (
    <>
      <Paper elevation={3} sx={{ minWidth: "450px" }}>
        <NodeHeader
          name={name}
          setName={setName}
          editableName={editableName}
          setEditableName={setEditableName}
        />
        <NodeBody
          robotType={robotType}
          setRobotType={setRobotType}
          robotSource={robotSource}
          setRobotSource={setRobotSource}
          system={system}
          setSystem={setSystem}
          prompt={prompt}
          setPrompt={setPrompt}
        />
      </Paper>
    </>
  );
});

export default RobotNode;
