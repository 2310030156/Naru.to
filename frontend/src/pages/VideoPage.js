import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimeById } from "../services/api";
import { Box, Typography, Button, AppBar, Toolbar } from "@mui/material";

const VideoPage = ({ setDarkMode, darkMode }) => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAnimeById(id).then(res => setAnime(res.data));
  }, [id]);

  if (!anime) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#18162b" }}>
      <AppBar position="static" sx={{ bgcolor: "#18162b", boxShadow: "0 0 20px #6f3cff" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 900, color: "#a366ff", letterSpacing: 2, textShadow: "0 0 10px #a366ff, 0 0 20px #6f3cff" }}>
            Naru.to - {anime.title}
          </Typography>
          <Button color="inherit" onClick={() => navigate("/catalog")}
            sx={{ color: "#a366ff", fontWeight: 700, textShadow: "0 0 8px #a366ff" }}>
            Catalog
          </Button>
          <Button color="inherit" onClick={() => navigate("/watchlist")}
            sx={{ color: "#a366ff", fontWeight: 700, textShadow: "0 0 8px #a366ff" }}>
            Watchlist
          </Button>
          <Button color="inherit" onClick={() => { localStorage.clear(); navigate("/login"); }}
            sx={{ color: "#a366ff", fontWeight: 700, textShadow: "0 0 8px #a366ff" }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{
          background: "#23203a",
          borderRadius: 6,
          boxShadow: "0 0 30px #6f3cff, 0 0 10px #a366ff",
          border: "2px solid #6f3cff",
          maxWidth: 800,
          width: "100%",
          p: 4,
          mt: 6,
          mb: 3,
          color: "#fff"
        }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: "#fff" }}>{anime.title}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, color: "#a366ff" }}>{anime.genre} | {anime.year}</Typography>
          <Typography variant="body1" sx={{ mb: 2, color: "#bdbdbd" }}>{anime.description}</Typography>
          <video controls width="100%" poster={anime.imageUrl} style={{ borderRadius: 12, boxShadow: "0 0 20px #6f3cff" }}>
            <source src={anime.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPage;
