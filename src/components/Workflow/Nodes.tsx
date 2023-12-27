import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { ImEnter } from "react-icons/im";
import { MdCloudUpload } from "react-icons/md";
import { MdClose, MdHelp } from "react-icons/md";

const CardTitle: React.FC<{
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}> = React.memo(({ title, setTitle }) => {
  const theme = useTheme();
  const [editing, setEditing] = useState(false);
  return editing ? (
    <TextField
      fullWidth
      autoFocus
      autoComplete="off"
      variant="standard"
      value={title}
      onBlur={() => setEditing(false)}
      onChange={(e) => setTitle(e.target.value)}
      inputProps={{
        style: {
          padding: 0,
          fontSize: theme.typography.body1.fontSize,
        },
      }}
    />
  ) : (
    <Typography onDoubleClick={() => setEditing(true)}>{title}</Typography>
  );
});

const CardAction: React.FC = React.memo(() => {
  return (
    <Box>
      <IconButton>
        <MdHelp />
      </IconButton>
      <IconButton>
        <MdClose />
      </IconButton>
    </Box>
  );
});

export const InputNode: React.FC = () => {
  const theme = useTheme();
  const [title, setTitle] = useState("Text Input");
  const [source, setSource] = useState("document");
  const [websiteUrl, setWebsiteUrl] = useState("");
  return (
    <>
      <Card sx={{ width: theme.spacing(45) }}>
        <CardHeader
          avatar={<ImEnter />}
          title={<CardTitle title={title} setTitle={setTitle} />}
          subheader="Extract text from a given source."
          action={<CardAction />}
        />
        <CardContent>
          <FormControl fullWidth>
            <FormLabel
              sx={{
                "&.Mui-focused": {
                  color: theme.palette.text.secondary,
                },
              }}
            >
              Source
            </FormLabel>
            <RadioGroup
              row
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <FormControlLabel
                value="document"
                control={<Radio />}
                label="Document"
              />
              <FormControlLabel
                value="website"
                control={<Radio />}
                label="Website"
              />
            </RadioGroup>
          </FormControl>
          {source === "document" && (
            <FormControl fullWidth>
              <FormLabel>File</FormLabel>
              <Button
                component="label"
                variant="contained"
                startIcon={<MdCloudUpload />}
              >
                Upload File
                <input type="file" hidden />
              </Button>
            </FormControl>
          )}
          {source === "website" && (
            <FormControl fullWidth>
              <FormLabel>Link</FormLabel>
              <TextField
                fullWidth
                variant="standard"
                autoComplete="off"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </FormControl>
          )}
        </CardContent>
      </Card>
    </>
  );
};
