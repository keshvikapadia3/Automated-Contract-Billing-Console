import { useState } from "react";
import {
  Box, Button, IconButton, InputAdornment,
  Paper, TextField, Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAppDispatch } from "../hooks/reduxHooks";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "keshvi3506";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      dispatch(login(username));
      navigate("/dashboard");
    } else {
      setError("❌ Invalid username or password!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)", // Account for fixed header height
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={4} sx={{
        p: 5, width: 400, borderRadius: 3,
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {/* Logo */}
        <Box sx={{
          width: 60, height: 60, borderRadius: "50%",
          backgroundColor: "#003A70", display: "flex",
          alignItems: "center", justifyContent: "center", mb: 2,
        }}>
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>L</Typography>
        </Box>

        {/* Title */}
        <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold", color: "#003A70" }}>
          Welcome to ACBC
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to Automated Contract Billing Console
        </Typography>

        {/* Error Message */}
        {error && (
          <Box sx={{
            width: "100%", mb: 1, p: 1.5,
            backgroundColor: "#fdecea", borderRadius: 2,
            border: "1px solid #f5c2c7",
          }}>
            <Typography variant="body2" color="#d32f2f">{error}</Typography>
          </Box>
        )}

        {/* Username */}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => { setUsername(e.target.value); setError(""); }}
          error={!!error}
        />

        {/* Password with show/hide toggle */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          sx={{ mb: 2 }}
          error={!!error}
         slotProps={{
  input: {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword((prev) => !prev)}
          edge="end"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  },
}}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleLogin}
          sx={{
            mt: 1, py: 1.5,
            backgroundColor: "#003A70",
            borderRadius: 2,
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#002a54" },
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;