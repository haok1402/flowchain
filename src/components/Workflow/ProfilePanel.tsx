import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Panel } from "reactflow";

import { useFirebase } from "src/contexts/Firebase";

const ProfilePanel = React.memo(() => {
  const { user } = useFirebase();
  const { spacing } = useTheme();

  return (
    <Panel
      position="top-right"
      style={{
        transform: `translate(-${spacing(1)}, -${spacing(1)})`,
      }}
    >
      <IconButton>
        <Avatar src={user?.photoURL || ""} />
      </IconButton>
    </Panel>
  );
});

export default ProfilePanel;
