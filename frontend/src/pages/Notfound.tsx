import { Stack, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Stack
      sx={{ color: "grey.500" }}
      direction="row"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography color="white" variant="h5">404 Not found</Typography>
    </Stack>
  );
};

export { NotFound };
