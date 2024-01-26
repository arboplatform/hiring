import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  defaultValuesPropertyForm,
  updatePropertySchema,
} from "../../schemas/property";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../api";
import { QUERY_KEY } from "../../constants";

type updatePropertyFormData = z.infer<typeof updatePropertySchema>;

type DialogUpdatePropertyProps = {
  open: boolean;
  handleClose: () => void;
  defaultValues: updatePropertyFormData;
  propertyId: number;
  addressId: number;
};

const DialogEditProperty = ({
  handleClose,
  open,
  propertyId,
  addressId,
  defaultValues,
}: DialogUpdatePropertyProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<updatePropertyFormData>({
    resolver: zodResolver(updatePropertySchema),
    defaultValues: defaultValuesPropertyForm.parse(
      defaultValues
    ) as unknown as updatePropertyFormData,
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: updatePropertyFormData) => {
      return api.patch(`/properties/${propertyId}/address/${addressId}`, data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.properties] });
      reset();
    },
  });

  const handleSubmitEditProperty: SubmitHandler<
    updatePropertyFormData
  > = async (data) => {
    await toast.promise(mutateAsync(data), {
      success: "Imóvel editado com sucesso",
      error: "Falha ao editar imóvel",
      loading: "Editando imóvel",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
      }}
      onSubmit={handleSubmit(handleSubmitEditProperty)}
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
        <FormControlLabel
          control={
            <Checkbox
              {...register("sold")}
              defaultChecked={defaultValues.sold}
            />
          }
          label="Vendido"
        />
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
        <Button type="submit">Editar</Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogEditProperty };
