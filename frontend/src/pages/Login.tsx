import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputPassword } from "../components/InputPassword";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { loginUserFormSchema } from "../schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

type loginUserFormData = z.infer<typeof loginUserFormSchema>;

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const handleSubmitLogin: SubmitHandler<loginUserFormData> = (data) => {
    console.log(data);
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          bgcolor: "white",
          borderRadius: 2,
          padding: 2,
          marginTop: 20,
        }}
        maxWidth="sm"
      >
        <AccountCircleIcon sx={{ m: 1, color: "primary.main", fontSize: 50 }} />
        <Typography component="h1" variant="h4" color="gray">
          Login
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={3}
          onSubmit={handleSubmit(handleSubmitLogin)}
        >
          <TextField
            {...register("email", { required: true })}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            label="E-mail"
            fullWidth
          />
          <InputPassword register={register("password")} />
          <LoadingButton
            type="submit"
            sx={{
              padding: 1,
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            Login
          </LoadingButton>
        </Box>

        <Root>
          <Divider>ou</Divider>
        </Root>

        <Link
          to="/register"
          style={{
            width: "100%",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              padding: 1,
              textDecoration: "none",
              color: "white",
            }}
          >
            Registre-se
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export { Login };
