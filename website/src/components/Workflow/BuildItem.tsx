import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";
import { MdInput } from "react-icons/md";
import { MdOutput } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";

import { useWorkflow } from "src/contexts/Workflow";

interface BuildItemProps {
  itemType: "Input" | "Robot" | "Output";
}

const ToggleButton = styled(Button)<ButtonProps>(({ theme, variant }) => ({
  minWidth: 0,
  padding: "0.75rem",
  border: "none",
  "&:hover": {
    border: "none",
    backgroundColor: variant === "contained" ? theme.palette.primary.main : "",
  },
}));

const ItemIcon = ({ itemType }: { itemType: string }) => {
  switch (itemType) {
    case "Input":
      return <MdInput fontSize="1.25rem" />;
    case "Robot":
      return <RiRobot2Line fontSize="1.25rem" />;
    case "Output":
      return <MdOutput fontSize="1.25rem" />;
    default:
      return <></>;
  }
};

const ItemTitle = (itemType: string) => {
  switch (itemType) {
    case "Input":
      return "Input — Q";
    case "Robot":
      return "Robot — W";
    case "Output":
      return "Output — E";
    default:
      return "";
  }
};

const BuildItem: React.FC<BuildItemProps> = React.memo(({ itemType }) => {
  const { buildItemType, setBuildItemType } = useWorkflow();
  return (
    <ToggleButton
      title={ItemTitle(itemType)}
      variant={buildItemType === itemType ? "contained" : "outlined"}
      onClick={() => setBuildItemType(itemType)}
      disableRipple={buildItemType === itemType}
    >
      <ItemIcon itemType={itemType} />
    </ToggleButton>
  );
});

export default BuildItem;
