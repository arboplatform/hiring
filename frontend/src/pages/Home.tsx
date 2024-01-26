import AddHomeIcon from "@mui/icons-material/AddHome";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { DialogCreateProperty } from "../components/DialogCreateProperty";

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpenDialog = () => setOpen(true);
  const handleClickCloseDialog = () => setOpen(false);

  return (
    <Stack>
      <Navbar />
      <DialogCreateProperty open={open} handleClose={handleClickCloseDialog} />
      <Stack>
        <Box
          maxWidth="lg"
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 auto",
            paddingY: 3,
            color: "white",
          }}
        >
          <Typography component="h4" variant="h5" fontWeight="500">
            Lista de imóveis
          </Typography>

          <Button
            variant="contained"
            color="success"
            sx={{
              color: "white",
            }}
            endIcon={<AddHomeIcon />}
            onClick={handleClickOpenDialog}
          >
            Adicionar imóvel
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export { Home };
