import Stack, { StackProps } from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ ...rest }: StackProps) => {
  return (
    <Stack
      sx={{ color: "grey.500" }}
      direction="row"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      {...rest}
    >
      <CircularProgress size={120} color="secondary" />
    </Stack>
  );
};

export { Loading };
