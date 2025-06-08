package com.example.watchtrack.repository;

import com.example.watchtrack.model.Pelicula;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PeliculaRepository extends JpaRepository<Pelicula, Long> {
	Optional<Pelicula> findByTmdbId(Long tmdbId);

}
