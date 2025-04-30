import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CatalogPage from "./pages/CatalogPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WatchlistPage from "./pages/WatchlistPage";
import VideoPage from "./pages/VideoPage";
import { useState } from "react";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#ff4081" },
      secondary: { main: "#90caf9" },
    },
    typography: {
      fontFamily: "'Roboto', 'Noto Sans JP', 'Arial', sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage setDarkMode={setDarkMode} />} />
          <Route path="/signup" element={<SignupPage setDarkMode={setDarkMode} />} />
          <Route path="/catalog" element={isAuthenticated() ? <CatalogPage setDarkMode={setDarkMode} darkMode={darkMode} /> : <Navigate to="/login" />} />
          <Route path="/watchlist" element={<WatchlistPage setDarkMode={setDarkMode} darkMode={darkMode} />} />
          <Route path="/video/:id" element={<VideoPage setDarkMode={setDarkMode} darkMode={darkMode} />} />
          <Route path="*" element={<Navigate to={isAuthenticated() ? "/catalog" : "/login"} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
