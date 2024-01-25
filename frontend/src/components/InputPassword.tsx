import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputPasswordProps = OutlinedInputProps & {
  register: UseFormRegisterReturn;
  helperText?: React.ReactNode;
};

const InputPassword = ({
  register,
  helperText,
  error,
  ...rest
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowPassword((show) => !show);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor={register.name}>{rest.label}</InputLabel>
      <OutlinedInput
        {...rest}
        {...register}
        error={error}
        id={register.name}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              aria-label="toggle password visibility"
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {!!helperText && error && (
        <FormHelperText id="my-helper-text">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export { InputPassword };
