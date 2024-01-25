import { createTheme } from "@mui/material/styles";
import { red, green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00A9FF",
    },
    secondary: {
      main: "#89CFF3",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: green.A200,
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

export default theme;
