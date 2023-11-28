import { useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/system/Box";
import React from "react";
import { MdEdit } from "react-icons/md";

interface NodeHeaderProps extends BoxProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  editableName: boolean;
  setEditableName: React.Dispatch<React.SetStateAction<boolean>>;
}

const NodeHeader: React.FC<NodeHeaderProps> = React.memo(
  ({ name, setName, editableName, setEditableName }) => {
    const theme = useTheme();
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1,
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        }}
      >
        {editableName ? (
          <TextField
            variant="standard"
            value={name}
            InputProps={{
              autoComplete: "off",
              autoFocus: true,
              disableUnderline: true,
            }}
            sx={{
              input: {
                ...theme.typography.body1,
                color: theme.palette.primary.contrastText,
                fontWeight: theme.typography.fontWeightBold,
              },
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                setEditableName(false);
              }
            }}
            onBlur={() => setEditableName(false)}
            onChange={(event) => setName(event.target.value)}
          />
        ) : (
          <Typography
            style={{
              color: theme.palette.primary.contrastText,
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            {name}
          </Typography>
        )}
        <MdEdit
          style={{ fontSize: "1.25rem", cursor: "pointer" }}
          onClick={() => setEditableName(true)}
        />
      </Box>
    );
  },
);

export default NodeHeader;
