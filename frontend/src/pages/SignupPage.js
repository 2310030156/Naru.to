import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";

const SignupPage = ({ setDarkMode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await signup(username, password);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", username);
      navigate("/catalog");
    } catch (err) {
      setError("Username already exists");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: "#18162b" }}>
      {/* Logo/Header */}
      <Box sx={{ width: "100vw", p: 2, borderBottom: "2px solid #6f3cff", mb: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1200, mx: "auto" }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#a366ff", textShadow: "0 0 10px #a366ff, 0 0 20px #6f3cff" }}>Naru.to</Typography>
        </Box>
      </Box>
      {/* Signup Card */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100vw" }}>
        <Box sx={{ background: "#231f3a", borderRadius: 6, boxShadow: "0 0 30px #6f3cff, 0 0 10px #a366ff", p: 5, minWidth: 350, border: "2px solid #6f3cff", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h5" align="center" sx={{ mb: 2, color: "#fff", textShadow: "0 0 8px #a366ff" }}>Sign Up</Typography>
          <form onSubmit={handleSignup} style={{ width: "100%" }}>
            <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} required InputProps={{ style: { color: '#fff', background: '#18162b', borderRadius: 8, boxShadow: '0 0 8px #6f3cff' } }} InputLabelProps={{ style: { color: '#a366ff' } }} />
            <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required InputProps={{ style: { color: '#fff', background: '#18162b', borderRadius: 8, boxShadow: '0 0 8px #6f3cff' } }} InputLabelProps={{ style: { color: '#a366ff' } }} />
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, py: 1.2, fontWeight: 700, borderRadius: 8, background: "linear-gradient(90deg,#a366ff 0%,#6f3cff 100%)", boxShadow: "0 0 10px #a366ff, 0 0 20px #6f3cff", color: "#fff", fontSize: 18, textTransform: 'none', '&:hover': { background: "linear-gradient(90deg,#6f3cff 0%,#a366ff 100%)" } }}>Sign Up</Button>
          </form>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button onClick={() => navigate("/login") } sx={{ color: "#a366ff" }}>Already have an account? Login</Button>
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      <Box sx={{ mt: 6, mb: 2, color: "#a366ff", fontWeight: 500, textAlign: "center", width: "100vw" }}>
        &copy; 2025 Naruto Anime Streaming
      </Box>
    </Box>
  );
};

export default SignupPage;
