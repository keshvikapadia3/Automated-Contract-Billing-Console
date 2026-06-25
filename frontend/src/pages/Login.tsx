import { useState } from "react";
import {
  Box, Button, IconButton, InputAdornment,
  Paper, TextField, Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAppDispatch } from "../hooks/reduxHooks";
import { loginSuccess } from "../features/auth/authSlice";
import { setContracts } from "../features/contracts/contractSlice";
import { setPoints } from "../features/points/pointSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error();

      const data = await response.json();

      dispatch(loginSuccess({
        username: data.username,
        token: "db-login-token",
      }));

      // ✅ Fetch data AFTER login before navigating
      const [contractsRes, pointsRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/contracts"),
        fetch("http://127.0.0.1:8000/points"),
      ]);

      const contractsData = await contractsRes.json();
      const pointsData = await pointsRes.json();

      dispatch(setContracts(contractsData.map((c: any) => ({
        id: c.id,
        name: c.name,
        startDate: c.start_date,
        endDate: c.end_date,
      }))));

      dispatch(setPoints(pointsData.map((p: any) => ({
        id: p.id.toString(),
        contractId: p.contract_id,
        pointName: p.point_name,
        value: p.value,
      }))));

      navigate("/dashboard");

    } catch {
      setError("❌ Invalid username or password!");
    }
  };

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 64px)",
      backgroundColor: "#f5f5f5",
    }}>
      <Paper elevation={4} sx={{
        p: 5, width: 400, borderRadius: 3,
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#003A70" }}>
          Login
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 1 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => { setUsername(e.target.value); setError(""); }}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((p) => !p)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{ mt: 2, backgroundColor: "#003A70" }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;