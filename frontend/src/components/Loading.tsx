import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Stack
      sx={{ color: "grey.500" }}
      direction="row"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress size={120} color="secondary" />
    </Stack>
  );
};

export { Loading };
