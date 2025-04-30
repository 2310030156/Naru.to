package com.animeflix.controller;

import com.animeflix.model.Anime;
import com.animeflix.repository.AnimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/anime")
public class AnimeController {
    @Autowired
    private AnimeRepository animeRepository;

    @GetMapping
    public List<Anime> getAllAnime() {
        return animeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Anime> getAnimeById(@PathVariable String id) {
        return animeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin: Create Anime
    @PostMapping
    public Anime createAnime(@RequestBody Anime anime) {
        if (anime.getCreatedAt() == null) {
            anime.setCreatedAt(new java.util.Date());
        }
        return animeRepository.save(anime);
    }

    // Admin: Update Anime
    @PutMapping("/{id}")
    public ResponseEntity<Anime> updateAnime(@PathVariable String id, @RequestBody Anime anime) {
        return animeRepository.findById(id)
                .map(existing -> {
                    anime.setId(id);
                    return ResponseEntity.ok(animeRepository.save(anime));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin: Delete Anime
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnime(@PathVariable String id) {
        return animeRepository.findById(id)
                .map(existing -> {
                    animeRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
