import React, { useEffect, useState } from "react";
import { getWatchlist, updateWatchlist, getAnimeList } from "../services/api";
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';

const WatchlistPage = ({ setDarkMode, darkMode }) => {
  const [animeList, setAnimeList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("username");

  useEffect(() => {
    getAnimeList().then(res => setAnimeList(res.data));
    getWatchlist(userId).then(res => setWatchlist(res.data.animeIds || []));
  }, [userId]);

  const toggleWatchlist = async (id) => {
    let updated;
    if (watchlist.includes(id)) {
      updated = watchlist.filter(animeId => animeId !== id);
    } else {
      updated = [...watchlist, id];
    }
    await updateWatchlist(userId, updated);
    setWatchlist(updated);
  };

  const myAnime = animeList.filter(a => watchlist.includes(a.id));

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#18162b", pb: 6 }}>
      <AppBar position="static" sx={{ bgcolor: "#18162b", boxShadow: "0 0 20px #6f3cff" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 900, color: "#a366ff", letterSpacing: 2, textShadow: "0 0 10px #a366ff, 0 0 20px #6f3cff" }}>
            Naru.to
          </Typography>
          <Button color="inherit" onClick={() => navigate("/catalog")}
            sx={{ color: "#a366ff", fontWeight: 700, textShadow: "0 0 8px #a366ff" }}>
            Catalog
          </Button>
          <Button color="inherit" onClick={() => { localStorage.clear(); navigate("/login"); }}
            sx={{ color: "#a366ff", fontWeight: 700, textShadow: "0 0 8px #a366ff" }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, color: "#fff", fontWeight: 700 }}>My Watchlist</Typography>
        <Grid container spacing={4}>
          {myAnime.map(anime => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={anime.id}>
              <Card sx={{
                background: "#23203a",
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
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>{anime.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#a366ff", mb: 1 }}>{anime.genre} | {anime.year}</Typography>
                  <Typography variant="body2" sx={{ color: "#bdbdbd" }}>{anime.description.substring(0, 70)}...</Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "space-between", px: 2, pb: 2 }}>
                  <Button variant="contained" onClick={() => toggleWatchlist(anime.id)}
                    sx={{
                      background: "linear-gradient(90deg,#a366ff 0%,#6f3cff 100%)",
                      color: "#fff",
                      borderRadius: 12,
                      px: 3,
                      py: 1,
                      fontWeight: 700,
                      fontSize: 16,
                      boxShadow: "0 0 10px #a366ff, 0 0 20px #6f3cff",
                      textTransform: 'none',
                      ':hover': { background: "linear-gradient(90deg,#6f3cff 0%,#a366ff 100%)" }
                    }}>
                    Remove
                  </Button>
                  <Button variant="contained" onClick={() => navigate(`/video/${anime.id}`)}
                    sx={{
                      background: "linear-gradient(90deg,#a366ff 0%,#6f3cff 100%)",
                      color: "#fff",
                      borderRadius: 12,
                      px: 3,
                      py: 1,
                      fontWeight: 700,
                      fontSize: 16,
                      boxShadow: "0 0 10px #a366ff, 0 0 20px #6f3cff",
                      textTransform: 'none',
                      ':hover': { background: "linear-gradient(90deg,#6f3cff 0%,#a366ff 100%)" }
                    }}>
                    Watch Now
                  </Button>
                  <FavoriteIcon
                    sx={{ ml: 1, color: watchlist.includes(anime.id) ? 'red' : 'white', cursor: 'pointer', fontSize: 32, filter: 'drop-shadow(0 0 8px #a366ff)', transition: 'color 0.2s' }}
                    onClick={() => toggleWatchlist(anime.id)}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ textAlign: "center", color: "#bdbdbd", mt: 8, fontSize: 18 }}>
        2025 Naru.to Anime Streaming
      </Box>
    </Box>
  );
};

export default WatchlistPage;
