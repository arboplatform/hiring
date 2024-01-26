import { Box, Button, Container, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputPassword } from "../components/InputPassword";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { registerUserFormSchema } from "../schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Divider } from "../components/Divider";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api";
import { useNavigate } from "react-router-dom";

type registerUserFormData = z.infer<typeof registerUserFormSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerUserFormData>({
    resolver: zodResolver(registerUserFormSchema),
  });
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (newUser: registerUserFormData) => {
      return api.post("/users", newUser);
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleSubmitLogin: SubmitHandler<registerUserFormData> = async (
    data
  ) => {
    await toast.promise(mutateAsync(data), {
      success: "Usuário criado! Faça login",
      loading: "Criando seu usuário",
      error:
        "Erro ao criar seu usuário, verifque se seu e-mail já foi cadastrado",
    });
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
          marginTop: 8,
        }}
        maxWidth="sm"
      >
        <AccountCircleIcon sx={{ m: 1, color: "primary.main", fontSize: 50 }} />
        <Typography component="h1" variant="h4" color="gray">
          Registrar-se
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={handleSubmit(handleSubmitLogin)}
        >
          <TextField
            {...register("name", { required: true })}
            error={!!errors.name?.message}
            helperText={errors.name?.message}
            label="Nome"
            fullWidth
          />
          <TextField
            {...register("email", { required: true })}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            label="E-mail"
            fullWidth
          />
          <InputPassword
            register={register("password")}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            label="Senha"
          />
          <InputPassword
            register={register("confirmPassword")}
            error={!!errors.confirmPassword?.message}
            helperText={errors.confirmPassword?.message}
            label="Confirmar senha"
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isPending}
            sx={{
              padding: 1,
              textDecoration: "none",
              color: "white",
            }}
          >
            Registrar
          </LoadingButton>
        </Box>

        <Divider>Já tem conta ?</Divider>

        <Link
          to="/login"
          style={{
            width: "100%",
          }}
        >
          <Button
            type="submit"
            fullWidth
            sx={{
              padding: 1,
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            Faça Login
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export { Register };
