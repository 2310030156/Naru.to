package com.animeflix.config;

import com.animeflix.model.Anime;
import com.animeflix.repository.AnimeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Date;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedDatabase(AnimeRepository animeRepository) {
        return args -> {
            if (animeRepository.count() == 0) {
                Anime aot = new Anime();
                aot.setTitle("Attack on Titan");
                aot.setDescription("In a world where humanity resides within enormous walled cities to protect themselves from Titans, giant humanoid creatures.");
                aot.setGenre("Action, Drama, Fantasy");
                aot.setYear(2013);
                aot.setImageUrl("https://upload.wikimedia.org/wikipedia/en/9/9a/Shingeki_no_Kyojin_manga_volume_1.jpg");
                aot.setVideoUrl("https://samplelib.com/mp4/sample-720p.mp4");

                Anime demonSlayer = new Anime();
                demonSlayer.setTitle("Demon Slayer: Kimetsu no Yaiba");
                demonSlayer.setDescription("After his family is slaughtered by demons, Tanjiro Kamado becomes a demon slayer to avenge his family and cure his sister.");
                demonSlayer.setGenre("Action, Supernatural, Adventure");
                demonSlayer.setYear(2019);
                demonSlayer.setImageUrl("https://upload.wikimedia.org/wikipedia/en/5/5c/Kimetsu_no_Yaiba_Volume_1.png");
                demonSlayer.setVideoUrl("https://samplelib.com/mp4/sample-5s.mp4");

                animeRepository.save(aot);
                animeRepository.save(demonSlayer);
            }
        };
    }

    @Bean
    CommandLineRunner seedAnimeCreatedAt(AnimeRepository animeRepository) {
        return args -> {
            animeRepository.findAll().stream()
                .filter(anime -> anime.getCreatedAt() == null)
                .forEach(anime -> {
                    anime.setCreatedAt(new Date());
                    animeRepository.save(anime);
                });
        };
    }
}
