import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>

        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            backgroundColor: "#f5f5f5",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              maxWidth: "1200px",
              mx: "auto",
              width: "100%",
            }}
          >
            <Outlet />
          </Box>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;