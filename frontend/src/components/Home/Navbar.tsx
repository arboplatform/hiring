import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../lib/localStorage";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClickLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          paddingY: "10px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Box>
            <Typography variant="h4" component="h2" color="gray">
              Imovel
            </Typography>
          </Box>
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
