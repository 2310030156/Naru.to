package com.animeflix.repository;

import com.animeflix.model.Watchlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface WatchlistRepository extends MongoRepository<Watchlist, String> {
    Optional<Watchlist> findByUserId(String userId);
}
