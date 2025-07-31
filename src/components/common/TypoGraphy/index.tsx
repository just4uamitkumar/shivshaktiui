import { Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material";

interface Props extends TypographyProps {
  gutterBottom?: boolean;
  noWrap?: boolean;
  style?: object;
  variant?:
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";
  color?:
  | "initial"
  | "inherit"
  | "primary"
  | "secondary"
  | "textPrimary"
  | "textSecondary"
  | "error"
  | string;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  children?: React.ReactNode;
  typeClass?: string;
  ariaLabel?: string;
}

const TypoGraphy: React.FC<Props> = ({
  variant,
  color,
  align,
  style,
  children,
  typeClass,
  ariaLabel
}) => {
  return (
    <Typography
      className={typeClass}
      variant={variant}
      color={color}
      sx={style}
      align={align}
      aria-label={ariaLabel}
    >
      {children}
    </Typography>
  );
};

export default TypoGraphy;