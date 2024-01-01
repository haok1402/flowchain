import Avatar from "@mui/material/Avatar";
import React from "react";
import { Panel } from "reactflow";

import { useFirebase } from "src/contexts/Firebase";

const ProfilePanel = React.memo(() => {
  const { user } = useFirebase();

  return (
    <Panel position="top-right">
      <Avatar src={user?.photoURL || ""} />
    </Panel>
  );
});

export default ProfilePanel;
