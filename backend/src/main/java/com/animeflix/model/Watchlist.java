package com.animeflix.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "watchlist")
public class Watchlist {
    @Id
    private String id;
    private String userId;
    private List<String> animeIds;

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public List<String> getAnimeIds() {
        return animeIds;
    }
    public void setAnimeIds(List<String> animeIds) {
        this.animeIds = animeIds;
    }
}
