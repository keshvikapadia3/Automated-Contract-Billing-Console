import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Divider, Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StarIcon from "@mui/icons-material/Star";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
// 22import { clearPoints } from "../features/points/pointSlice";
import { setPoints } from "../features/points/pointSlice";
const DRAWER_WIDTH = 240;

interface Props {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Contracts",  icon: <AssignmentIcon />, path: "/contracts" },
  { label: "Points",     icon: <StarIcon />, path: "/points" },
  { label: "Invoice",   icon: <ReceiptIcon />, path: "/invoice" },
];

const Sidebar = ({ open, onClose }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    // dispatch(clearPoints());
    dispatch(setPoints([]));
    navigate("/");
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          backgroundColor: "#003A70",
          color: "white",
        },
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ p: 3, backgroundColor: "#002a54" }}>
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
          ACBC
        </Typography>
        <Typography variant="body2" sx={{ color: "#90caf9", mt: 0.5 }}>
          Billing Console
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#0077b6" }} />

      {/* Menu Items */}
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  backgroundColor: isActive ? "#0077b6" : "transparent",
                  "&:hover": { backgroundColor: "#0077b6" },
                  transition: "0.2s",
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                {/* ✅ FIX: replaced primaryTypographyProps with sx on Typography directly */}
                <ListItemText
                  primary={
                    <Typography sx={{ color: "white", fontWeight: isActive ? "bold" : "normal" }}>
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "#0077b6", mt: "auto" }} />

      {/* Logout */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              mx: 1,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#c62828" },
              transition: "0.2s",
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            {/* ✅ FIX: replaced primaryTypographyProps with sx on Typography directly */}
            <ListItemText
              primary={
                <Typography sx={{ color: "white" }}>
                  Logout
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;