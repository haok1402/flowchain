import Avatar from "@mui/material/Avatar";
import { signOut } from "firebase/auth";
import React from "react";
import { Panel } from "reactflow";

import { useFirebase } from "@contexts/Firebase";

const ProfilePanel = React.memo(() => {
  const { user, auth } = useFirebase();

  return (
    <Panel position="top-right">
      <Avatar
        src={user?.photoURL || ""}
        imgProps={{
          referrerPolicy: "no-referrer",
        }}
        sx={{ cursor: "pointer" }}
        onClick={() => {
          signOut(auth);
        }}
      />
    </Panel>
  );
});

export default ProfilePanel;
