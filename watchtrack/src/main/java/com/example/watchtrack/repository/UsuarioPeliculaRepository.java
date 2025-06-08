package com.example.watchtrack.repository;

import com.example.watchtrack.model.UsuarioPelicula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioPeliculaRepository extends JpaRepository<UsuarioPelicula, Long> {
    List<UsuarioPelicula> findByUsuario_Id(Long usuarioId);
    Optional<UsuarioPelicula> findByUsuario_IdAndPelicula_Id(Long usuarioId, Long peliculaId);
    Optional<UsuarioPelicula> findByUsuario_IdAndPelicula_TmdbId(Long usuarioId, Long tmdbId);

}
