import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#003A70",
        color: "white",
        textAlign: "center",
        padding: 2,
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body1"> Copyright © LEI 2026</Typography>
    </Box>
  );
};

export default Footer;