import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React from "react";

const AuthDialog: React.FC<{
  open: boolean;
  onClose: () => void;
}> = React.memo(({ open, onClose }) => {
  const { palette, spacing } = useTheme();
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          width: spacing(50),
          padding: spacing(2),
          backgroundColor: palette.background.paper,
        }}
      >
        <Typography variant="h5">Flowchain</Typography>
      </Box>
    </Modal>
  );
});

export default AuthDialog;
