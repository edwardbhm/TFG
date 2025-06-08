package com.example.watchtrack.repository;

import com.example.watchtrack.model.UsuarioSerie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioSerieRepository extends JpaRepository<UsuarioSerie, Long> {
    List<UsuarioSerie> findByUsuarioId(Long usuarioId);
    Optional<UsuarioSerie> findByUsuarioIdAndSerieId(Long usuarioId, Long serieId);
}
