import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { clearToken } from "../../lib/localStorage";

const Navbar = () => {
  const handleClickLogout = () => {
    clearToken();
    location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          padding: "0 10px",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            padding: 0,
          }}
        >
          <Typography variant="h4" component="h2" color="gray">
            Imovel
          </Typography>

          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={handleClickLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { Navbar };
