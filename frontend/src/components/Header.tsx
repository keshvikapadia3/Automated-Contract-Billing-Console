import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import logo from "../assets/linde-logo.png";

interface Props {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: Props) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <AppBar position="static" sx={{ backgroundColor: "#003A70" , position: "fixed", top: 0, left: 0}}>
      <Toolbar>
        {/* Hamburger Button */}
        {!isLoginPage && (
          <IconButton
            color="inherit"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo + Title */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img
            src={logo}
            alt="Linde Logo"
            style={{ width: 70, height: 50, marginRight: 12, padding: 5 }}
          />
          <Typography variant="h6">
            Automated Contract Billing Console
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;