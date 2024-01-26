import { Interpolation, Theme } from "@mui/material/styles";

export const globalStyles: Interpolation<Theme> = {
  body: { backgroundColor: "#00A9FF", margin: 0 },
  "*::-webkit-scrollbar": {
    width: "10px",
  },
  "*::-webkit-scrollbar-track": {
    background: "#deedf3",
    borderRadius: "16px",
  },
  "*::-webkit-scrollbar-thumb": {
    background: "#89cff3",
    borderRadius: "16px",
  },
};
