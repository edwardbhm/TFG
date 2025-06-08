package com.example.watchtrack.repository;

import com.example.watchtrack.model.Episodio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EpisodioRepository extends JpaRepository<Episodio, Long> {
    List<Episodio> findBySerieId(Long serieId);
}
