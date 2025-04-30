package com.animeflix.controller;

import com.animeflix.model.Watchlist;
import com.animeflix.repository.WatchlistRepository;
import com.animeflix.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/watchlist")
public class WatchlistController {
    @Autowired
    private WatchlistRepository watchlistRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<Watchlist> getWatchlist(@PathVariable String userId) {
        Optional<Watchlist> watchlist = watchlistRepository.findByUserId(userId);
        return watchlist.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Watchlist> addToWatchlist(@PathVariable String userId, @RequestBody List<String> animeIds) {
        Watchlist watchlist = watchlistRepository.findByUserId(userId).orElse(new Watchlist());
        watchlist.setUserId(userId);
        watchlist.setAnimeIds(animeIds);
        watchlistRepository.save(watchlist);
        return ResponseEntity.ok(watchlist);
    }
}
