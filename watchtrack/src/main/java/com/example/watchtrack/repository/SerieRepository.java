package com.example.watchtrack.repository;

import com.example.watchtrack.model.Serie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SerieRepository extends JpaRepository<Serie, Long> {
    Optional<Serie> findByTmdbId(Long tmdbId);
}