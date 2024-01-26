import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createPropertySchema } from "../../schemas/property";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../api";
import { QUERY_KEY } from "../../constants";

type createPropertyFormData = z.infer<typeof createPropertySchema>;

type DialogCreatePropertyProps = {
  open: boolean;
  handleClose: () => void;
};

const DialogCreateProperty = ({
  handleClose,
  open,
}: DialogCreatePropertyProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createPropertyFormData>({
    resolver: zodResolver(createPropertySchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: createPropertyFormData) => {
      return api.post("/properties", data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.properties] });
      reset();
    },
  });

  const handleSubmitCreateProperty: SubmitHandler<
    createPropertyFormData
  > = async (data) => {
    await toast.promise(mutateAsync(data), {
      success: "Imóvel criado com sucesso",
      error: "Falha ao criar imóvel",
      loading: "Criando imóvel",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
      }}
      onSubmit={handleSubmit(handleSubmitCreateProperty)}
    >
      <DialogTitle>Imóvel</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <TextField
          {...register("title")}
          autoFocus
          required
          label="Titulo"
          fullWidth
          variant="standard"
          error={!!errors.title?.message}
          helperText={errors.title?.message}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FormControl variant="standard">
            <InputLabel>Tamanho</InputLabel>
            <Input
              {...register("size")}
              endAdornment={<InputAdornment position="end">m</InputAdornment>}
            />
            {!!errors.size?.message && (
              <FormHelperText>{errors.size?.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl variant="standard">
            <InputLabel>Valor</InputLabel>
            <Input
              {...register("value")}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
            />
            {!!errors.value?.message && (
              <FormHelperText>{errors.value?.message}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogTitle>Endereço</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <TextField
          {...register("address.street")}
          autoFocus
          required
          label="Rua"
          fullWidth
          variant="standard"
          error={!!errors.address?.street?.message}
          helperText={errors.address?.street?.message}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            {...register("address.zipCode")}
            autoFocus
            required
            label="CEP"
            fullWidth
            variant="standard"
            error={!!errors.address?.zipCode?.message}
            helperText={errors.address?.zipCode?.message}
          />
          <TextField
            {...register("address.number")}
            autoFocus
            required
            label="Número"
            fullWidth
            variant="standard"
            error={!!errors.address?.number?.message}
            helperText={errors.address?.number?.message}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            {...register("address.city")}
            autoFocus
            required
            label="Cidade"
            fullWidth
            variant="standard"
            error={!!errors.address?.city?.message}
            helperText={errors.address?.city?.message}
          />
          <TextField
            {...register("address.state")}
            autoFocus
            required
            label="Estado (Ex: SP)"
            fullWidth
            variant="standard"
            error={!!errors.address?.state?.message}
            helperText={errors.address?.state?.message}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type="submit">Criar</Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogCreateProperty };
