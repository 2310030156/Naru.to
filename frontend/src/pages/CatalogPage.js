import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimeList, getWatchlist, updateWatchlist } from "../services/api";
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, IconButton, AppBar, Toolbar, Switch, TextField, Snackbar, Alert as MuiAlert } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CatalogPage = ({ setDarkMode, darkMode }) => {
  // Debug: Log when CatalogPage renders
  console.log("CatalogPage rendered");
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("username");

  useEffect(() => {
    const fetchAnime = () => {
      getAnimeList()
        .then(res => {
          console.log("Fetched anime list:", res.data);
          setAnimeList(res.data);
        })
        .catch(err => {
          console.error("Error fetching anime list:", err);
        });
    };
    fetchAnime();
    const interval = setInterval(fetchAnime, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userId) {
      getWatchlist(userId)
        .then(res => {
          console.log("Fetched watchlist:", res.data);
          setWatchlist(res.data.animeIds || []);
        })
        .catch(err => {
          console.error("Error fetching watchlist:", err);
        });
    } else {
      console.warn("No userId found in localStorage");
    }
  }, [userId]);

  const toggleWatchlist = async (animeId) => {
    if (!userId) {
      setSnackbar({ open: true, message: 'You must be logged in to modify watchlist.', severity: 'error' });
      return;
    }
    let updated;
    if (watchlist.includes(animeId)) {
      updated = watchlist.filter(id => id !== animeId);
      setSnackbar({ open: true, message: 'Removed from watchlist!', severity: 'info' });
    } else {
      updated = [...watchlist, animeId];
      setSnackbar({ open: true, message: 'Added to watchlist!', severity: 'success' });
    }
    await updateWatchlist(userId, updated);
    setWatchlist(updated);
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const filtered = animeList.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "linear-gradient(135deg, #8f5cff 0%, #2b2d5c 100%)", pb: 6 }}>
      {/* Header */}
      <Box sx={{ width: "100vw", p: 2, borderBottom: "2px solid #6f3cff", mb: 4, bgcolor: "#18162b" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1400, mx: "auto" }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#a366ff", textShadow: "0 0 10px #a366ff, 0 0 20px #6f3cff" }}>Naru.to</Typography>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <TextField
              placeholder="Search anime..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{
                background: "#231f3a",
                borderRadius: 20,
                width: 300,
                input: { color: "#fff" },
                boxShadow: "0 0 8px #6f3cff",
                mx: 2
              }}
              InputProps={{ disableUnderline: true }}
            />
          </Box>
          <Box>
            <Button color="inherit" onClick={() => navigate("/watchlist")} sx={{ color: "#a366ff", fontWeight: 700, textShadow: "0 0 8px #a366ff" }}>Watchlist</Button>
            <Button color="inherit" onClick={() => { localStorage.clear(); navigate("/login"); }} sx={{ color: "#a366ff", fontWeight: 700, textShadow: "0 0 8px #a366ff" }}>Logout</Button>
          </Box>
        </Box>
      </Box>
      {/* Categories */}
      <Box sx={{ maxWidth: 1400, mx: "auto", mt: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>Categories</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {[...new Set(animeList.flatMap(a => a.genre.split(',').map(g => g.trim())))].map((genre, idx) => (
            <Button key={idx} sx={{
              background: "#18162b",
              color: "#00eaff",
              borderRadius: 16,
              px: 3,
              py: 1,
              fontWeight: 700,
              fontSize: 16,
              boxShadow: "0 0 8px #00eaff",
              textTransform: "none",
              ':hover': { background: "#2b2d5c", color: "#fff" }
            }}>{genre}</Button>
          ))}
        </Box>
      </Box>
      {/* Main Anime Cards */}
      <Box sx={{ maxWidth: 1400, mx: "auto", mt: 4 }}>
        <Grid container spacing={4}>
          {filtered.map(anime => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={anime.id}>
              <Box sx={{
                background: "#231f3a",
                borderRadius: 6,
                boxShadow: "0 0 30px #6f3cff, 0 0 10px #a366ff",
                border: "2px solid #6f3cff",
                p: 0,
                overflow: "hidden",
                transition: "transform .2s",
                ':hover': { transform: "scale(1.03)", boxShadow: "0 0 50px #a366ff, 0 0 20px #6f3cff" }
              }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={anime.imageUrl}
                  alt={anime.title}
                  sx={{ objectFit: "cover", cursor: "pointer" }}
                  onClick={() => navigate(`/video/${anime.id}`)}
                />
                <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <FavoriteIcon
                    sx={{ color: watchlist.includes(anime.id) ? 'red' : 'white', cursor: 'pointer', fontSize: 32, filter: 'drop-shadow(0 0 8px #a366ff)', transition: 'color 0.2s' }}
                    onClick={() => toggleWatchlist(anime.id)}
                  />
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>{anime.title}</Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", my: 1 }}>
                      {anime.genre.split(',').map((g, i) => (
                        <Button key={i} sx={{
                          background: "#00eaff",
                          color: "#18162b",
                          borderRadius: 10,
                          px: 2,
                          py: 0.5,
                          fontWeight: 700,
                          fontSize: 14,
                          boxShadow: "0 0 8px #00eaff",
                          textTransform: "none",
                          minWidth: 0,
                          ':hover': { background: "#a366ff", color: "#fff" }
                        }}>{g.trim()}</Button>
                      ))}
                    </Box>
                  </Box>
                  <Button variant="contained" onClick={() => navigate(`/video/${anime.id}`)} sx={{
                    background: "linear-gradient(90deg,#a366ff 0%,#6f3cff 100%)",
                    color: "#fff",
                    borderRadius: 12,
                    px: 4,
                    py: 1.2,
                    fontWeight: 700,
                    fontSize: 18,
                    boxShadow: "0 0 10px #a366ff, 0 0 20px #6f3cff",
                    textTransform: 'none',
                    ':hover': { background: "linear-gradient(90deg,#6f3cff 0%,#a366ff 100%)" }
                  }}>Watch Now</Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Recently Added Section */}
      <Box sx={{ maxWidth: 1400, mx: "auto", mt: 7 }}>
        <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>Recently Added</Typography>
        <Grid container spacing={4}>
          {(() => {
            // Get all filtered except Naruto
            const filteredWithoutNaruto = filtered.filter(anime => anime.title !== "Naruto");
            // Try to find Blue Box
            const blueBoxAnime = filteredWithoutNaruto.find(anime => anime.title === "Blue Box");
            let recentlyAdded;
            if (blueBoxAnime) {
              // Remove Blue Box from the list to avoid duplicates
              const others = filteredWithoutNaruto.filter(anime => anime.title !== "Blue Box");
              // Take 2 most recent from others, then add Blue Box
              recentlyAdded = [blueBoxAnime, ...others.slice(-2)].slice(0, 3);
            } else {
              // Just take the 3 most recent
              recentlyAdded = filteredWithoutNaruto.slice(-3);
            }
            return recentlyAdded.map(anime => (
              <Grid item xs={12} sm={6} md={4} key={anime.id}>
                <Box sx={{
                  background: "#231f3a",
                  borderRadius: 6,
                  boxShadow: "0 0 30px #6f3cff, 0 0 10px #a366ff",
                  border: "2px solid #6f3cff",
                  p: 0,
                  overflow: "hidden",
                  transition: "transform .2s",
                  ':hover': { transform: "scale(1.03)", boxShadow: "0 0 50px #a366ff, 0 0 20px #6f3cff" }
                }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={anime.imageUrl}
                    alt={anime.title}
                    sx={{ objectFit: "cover", cursor: "pointer" }}
                    onClick={() => navigate(`/video/${anime.id}`)}
                  />
                  <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <FavoriteIcon
                      sx={{ color: watchlist.includes(anime.id) ? 'red' : 'white', cursor: 'pointer', fontSize: 32, filter: 'drop-shadow(0 0 8px #a366ff)', transition: 'color 0.2s' }}
                      onClick={() => toggleWatchlist(anime.id)}
                    />
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>{anime.title}</Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", my: 1 }}>
                        {anime.genre.split(',').map((g, i) => (
                          <Button key={i} sx={{
                            background: "#00eaff",
                            color: "#18162b",
                            borderRadius: 10,
                            px: 2,
                            py: 0.5,
                            fontWeight: 700,
                            fontSize: 14,
                            boxShadow: "0 0 8px #00eaff",
                            textTransform: "none",
                            minWidth: 0,
                            ':hover': { background: "#a366ff", color: "#fff" }
                          }}>{g.trim()}</Button>
                        ))}
                      </Box>
                    </Box>
                    <Button variant="contained" onClick={() => navigate(`/video/${anime.id}`)} sx={{
                      background: "linear-gradient(90deg,#a366ff 0%,#6f3cff 100%)",
                      color: "#fff",
                      borderRadius: 12,
                      px: 4,
                      py: 1.2,
                      fontWeight: 700,
                      fontSize: 18,
                      boxShadow: "0 0 10px #a366ff, 0 0 20px #6f3cff",
                      textTransform: 'none',
                      ':hover': { background: "linear-gradient(90deg,#6f3cff 0%,#a366ff 100%)" }
                    }}>Watch Now</Button>
                  </Box>
                </Box>
              </Grid>
            ));
          })()}
        </Grid>
      </Box>
      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default CatalogPage;
