import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaTerminal } from "react-icons/fa";

import { useFirebase } from "@contexts/Firebase";

const BrandBox: React.FC = () => {
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
};

const ProviderStack: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { spacing } = useTheme();
  return (
    <Stack spacing={2} sx={{ marginTop: spacing(2) }}>
      {children}
    </Stack>
  );
};

const GoogleButton: React.FC = () => {
  const { auth } = useFirebase();
  return (
    <Button
      fullWidth
      variant="contained"
      startIcon={<FaGoogle />}
      onClick={async () => {
        const googleProvider = new GoogleAuthProvider();
        googleProvider.addScope("profile");
        await signInWithRedirect(auth, googleProvider);
      }}
    >
      Continue with Google
    </Button>
  );
};

const GitHubButton: React.FC = () => {
  return (
    <Button fullWidth variant="contained" startIcon={<FaGithub />}>
      Continue with GitHub
    </Button>
  );
};

const AuthDialog: React.FC<{
  open: boolean;
  onClose: () => void;
}> = React.memo(({ open, onClose }) => {
  const { spacing } = useTheme();
  return (
    <Modal open={open} onClose={onClose}>
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
        <BrandBox />
        <ProviderStack>
          <GoogleButton />
          <GitHubButton />
        </ProviderStack>
      </Paper>
    </Modal>
  );
});

export default AuthDialog;
