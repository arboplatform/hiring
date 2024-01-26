import { Box, Button, Container, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputPassword } from "../components/InputPassword";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { loginUserFormSchema } from "../schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { Divider } from "../components/Divider";
import { QUERY_KEY } from "../constants";
import toast from "react-hot-toast";

type loginUserFormData = z.infer<typeof loginUserFormSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: (data: loginUserFormData) =>
      api.post<string>("/users/auth", data),
    onSuccess: (data) => {
      toast.success("Login realizado com sucesso");
      queryClient.setQueryData([QUERY_KEY.token], data.data);
      navigate("/");
    },
  });

  const handleSubmitLogin: SubmitHandler<loginUserFormData> = async (data) => {
    await mutateAsync(data);
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
          <InputPassword register={register("password")} label="Senha" />
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{
              padding: 1,
              textDecoration: "none",
              color: "white",
            }}
          >
            Login
          </LoadingButton>
        </Box>

        <Divider>ou</Divider>

        <Link
          to="/register"
          style={{
            width: "100%",
          }}
        >
          <Button
            type="submit"
            variant="outlined"
            fullWidth
            sx={{
              padding: 1,
              border: "1px solid",
              borderColor: "primary.main",
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
