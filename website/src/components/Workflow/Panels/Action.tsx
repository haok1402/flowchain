import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { httpsCallable } from "firebase/functions";
import React, { useCallback } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Panel } from "reactflow";

import { useDialog } from "@contexts/Dialog";
import { useFirebase } from "@contexts/Firebase";
import { useWorkflow } from "@contexts/Workflow";
import { NodeData as SourceNodeData } from "@shared/workflow/nodes/source";

const ActionPanel = React.memo(() => {
  const { spacing } = useTheme();
  const { user, functions } = useFirebase();
  const { triggerAuthDialog } = useDialog();
  const { nodes } = useWorkflow();

  /**
   * This function processes the workflow asynchronously while obeying the
   * typological constraints of the workflow. More than one node can be
   * processed at the same time if they have no incomers or if all of their
   * incomers have been processed. The function will return when all nodes
   * have been processed or when processing is not possible anymore.
   */
  const executeWorkflow = useCallback(async () => {
    const completed: Set<string> = new Set();
    const executeSourceNode = httpsCallable(functions, "executeSourceNode");
    await Promise.all(
      nodes.map(async (node) => {
        if (node.type === "source") {
          const response = await executeSourceNode(
            (node.data as SourceNodeData).request,
          );
          console.log(response);
          completed.add(node.id);
        }
      }),
    );
  }, [nodes, functions]);

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
