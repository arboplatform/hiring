import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
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
};

const InputPassword = ({ register, ...rest }: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowPassword((show) => !show);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
      <OutlinedInput
        {...rest}
        {...register}
        id="outlined-adornment-password"
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
        label="Password"
      />
    </FormControl>
  );
};

export { InputPassword };
