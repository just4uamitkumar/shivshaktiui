// components/PasswordInput.tsx
import React, { useState } from "react";
import {
  InputAdornment,
  IconButton,
  type TextFieldProps,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordInputProps extends Omit<TextFieldProps, "type"> {
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant: "standard" | "outlined" | "filled";
  size?: "small" | "medium";
  inputClass?: string;
  inputId?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  variant,
  size,
  inputClass,
  inputId,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl variant={variant} className={inputClass}>
      <InputLabel htmlFor={inputId}>{label}</InputLabel>
      <OutlinedInput
        id={inputId}
        type={showPassword ? "text" : "password"}
        label={label}
        value={value}
        onChange={onChange}
        size={size}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordInput;