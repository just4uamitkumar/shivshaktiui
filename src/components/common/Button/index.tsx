import React from "react";
import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  text?: string;
  variant?: "text" | "outlined" | "contained";
  color?:
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";
  onClick?: (event: React.KeyboardEvent | React.MouseEvent) => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  btnClass?: string;
}

const CustomBtn: React.FC<Props> = ({
  text,
  variant,
  color,
  onClick,
  startIcon,
  btnClass,
  endIcon,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      className={btnClass}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default CustomBtn;
