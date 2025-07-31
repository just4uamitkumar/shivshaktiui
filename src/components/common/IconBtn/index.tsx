import { IconButton, Typography } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

interface Props {
  IconComponent: React.ElementType<SvgIconProps>;
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  ariaLabel?: string;
  iconClass?: string;
  disabled?: boolean;
  buttonText?: string;
}

const IconBtn: React.FC<Props> = ({ IconComponent, onClick, ariaLabel, iconClass, disabled, buttonText }) => {
  return (
    <IconButton onClick={onClick} aria-label={ariaLabel} className={iconClass} disabled={disabled}>
      <IconComponent />
      {buttonText && <Typography>{buttonText}</Typography>}
    </IconButton>
  );
}

export default IconBtn;
