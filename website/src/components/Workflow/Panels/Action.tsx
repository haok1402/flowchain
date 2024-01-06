import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { httpsCallable } from "firebase/functions";
import React, { useCallback } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Panel } from "reactflow";
import { getIncomers, getOutgoers } from "reactflow";

import { useDialog } from "@contexts/Dialog";
import { useFirebase } from "@contexts/Firebase";
import { useWorkflow } from "@contexts/Workflow";
import { NodeData as SourceNodeData } from "@shared/workflow/nodes/source";
import { Request as SourceNodeRequest } from "@shared/workflow/nodes/source";
import { Response as SourceNodeResponse } from "@shared/workflow/nodes/source";

const ActionPanel = React.memo(() => {
  const { spacing } = useTheme();
  const { user, functions } = useFirebase();
  const { triggerAuthDialog } = useDialog();
  const { nodes, setNodes } = useWorkflow();
  const { edges } = useWorkflow();

  /**
   * This function processes the workflow asynchronously while obeying the
   * typological constraints of the workflow. More than one node can be
   * processed at the same time if they have no incomers or if all of their
   * incomers have been processed. The function will return when all nodes
   * have been processed or when processing is not possible anymore.
   */
  const executeWorkflow = useCallback(async () => {
    const completed: Set<string> = new Set();

    const executeSourceNode = httpsCallable<
      SourceNodeRequest,
      SourceNodeResponse
    >(functions, "executeSourceNode");

    await Promise.all(
      nodes.map(async (node) => {
        if (node.type === "source") {
          const sourceId = node.id;
          setNodes((value) =>
            value.map((node) => {
              if (node.id === sourceId) {
                node.data = {
                  ...node.data,
                  status: "Running",
                };
              }
              return node;
            }),
          );
          const response = await executeSourceNode(
            (node.data as SourceNodeData).request,
          );
          setNodes((value) =>
            value.map((node) => {
              if (node.id === sourceId) {
                node.data = {
                  ...node.data,
                  status: "Completed",
                  response: response.data,
                };
              }
              return node;
            }),
          );
          completed.add(node.id);

          const targets = getOutgoers(node, nodes, edges);
          targets.forEach((node) => {
            const sources = getIncomers(node, nodes, edges);
            if (sources.every((node) => completed.has(node.id))) {
              const targetId = node.id;
              setNodes((value) =>
                value.map((node) => {
                  if (node.id === targetId) {
                    node.data = {
                      ...node.data,
                      status: "Running",
                    };
                  }
                  return node;
                }),
              );
              setNodes((value) =>
                value.map((node) => {
                  if (node.id === targetId) {
                    node.data = {
                      ...node.data,
                      status: "Completed",
                      response: sources.reduce(
                        (response, node) => {
                          const { text } = response;
                          const { text: nextText } = node.data.response;
                          return {
                            text: `${text}\n${nextText}`.trim(),
                          };
                        },
                        {
                          text: "",
                        },
                      ),
                    };
                  }
                  return node;
                }),
              );
            }
          });
        }
      }),
    );
  }, [nodes, functions, edges, setNodes]);

  const handlePlayOnClick = useCallback(() => {
    !user ? triggerAuthDialog() : executeWorkflow();
  }, [user, triggerAuthDialog, executeWorkflow]);

  return (
    <Panel position="top-center">
      <Paper sx={{ padding: spacing(0.5) }} elevation={3}>
        <IconButton color="success" onClick={handlePlayOnClick}>
          <MdPlayArrow size={spacing(2.5)} />
        </IconButton>
      </Paper>
    </Panel>
  );
});

export default ActionPanel;
