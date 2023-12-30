import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaTerminal } from "react-icons/fa";

const DialogPaper: React.FC<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    const { spacing } = useTheme();
    return (
      <Paper
        sx={{
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          width: spacing(45),
          padding: spacing(2),
        }}
      >
        {children}
      </Paper>
    );
  },
);

const BrandBox: React.FC = React.memo(() => {
  const { spacing } = useTheme();
  return (
    <Box
      sx={{
        userSelect: "none",
        textAlign: "center",
      }}
    >
      <FaTerminal size={spacing(3)} />
      <Typography component="h1" fontSize={spacing(3)}>
        Flowchain
      </Typography>
    </Box>
  );
});

const ProviderStack: React.FC<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    const { spacing } = useTheme();
    return (
      <Stack spacing={2} sx={{ marginTop: spacing(2) }}>
        {children}
      </Stack>
    );
  },
);

const GoogleButton: React.FC = React.memo(() => {
  return (
    <Button fullWidth variant="contained" startIcon={<FaGoogle />}>
      Continue with Google
    </Button>
  );
});

const GitHubButton: React.FC = React.memo(() => {
  return (
    <Button fullWidth variant="contained" startIcon={<FaGithub />}>
      Continue with GitHub
    </Button>
  );
});

const AuthDialog: React.FC<{
  open: boolean;
  onClose: () => void;
}> = React.memo(({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <DialogPaper>
        <BrandBox />
        <ProviderStack>
          <GoogleButton />
          <GitHubButton />
        </ProviderStack>
      </DialogPaper>
    </Modal>
  );
});

export default AuthDialog;
