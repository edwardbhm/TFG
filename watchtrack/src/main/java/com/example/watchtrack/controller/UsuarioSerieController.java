package com.example.watchtrack.controller;

import com.example.watchtrack.model.Serie;
import com.example.watchtrack.model.Usuario;
import com.example.watchtrack.model.UsuarioSerie;
import com.example.watchtrack.model.UsuarioSerie.EstadoSerie;
import com.example.watchtrack.repository.SerieRepository;
import com.example.watchtrack.repository.UsuarioRepository;
import com.example.watchtrack.repository.UsuarioSerieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario-series")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioSerieController {

    @Autowired private UsuarioSerieRepository usuarioSerieRepository;
    @Autowired private SerieRepository serieRepository;
    @Autowired private UsuarioRepository usuarioRepository;

    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<UsuarioSerie>> getSeriesByUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(usuarioSerieRepository.findByUsuario_Id(usuarioId));
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarSerie(
        @RequestParam Long usuarioId,
        @RequestParam Long serieId,
        @RequestParam EstadoSerie estado,
        @RequestParam String titulo,
        @RequestParam String sinopsis,
        @RequestParam int temporadas,
        @RequestParam String imagen
    ) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isEmpty()) return ResponseEntity.badRequest().body("Usuario no encontrado");

        Serie serie = serieRepository.findByTmdbId(serieId).orElseGet(() -> {
            Serie nueva = new Serie();
            nueva.setTmdbId(serieId);
            nueva.setTitulo(titulo);
            nueva.setSinopsis(sinopsis);
            nueva.setTemporadas(temporadas);
            nueva.setImagen(imagen);
            return serieRepository.save(nueva);
        });

        Usuario usuario = usuarioOpt.get();

        UsuarioSerie usuarioSerie = usuarioSerieRepository
            .findByUsuario_IdAndSerie_TmdbId(usuarioId, serieId)
            .orElse(new UsuarioSerie());

        usuarioSerie.setUsuario(usuario);
        usuarioSerie.setSerie(serie);
        usuarioSerie.setEstado(estado);

        usuarioSerieRepository.save(usuarioSerie);
        return ResponseEntity.ok("Serie guardada/actualizada correctamente.");
    }

    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarSerie(@RequestParam Long usuarioId, @RequestParam Long serieId) {
        Optional<UsuarioSerie> usuarioSerieOpt = usuarioSerieRepository.findByUsuario_IdAndSerie_TmdbId(usuarioId, serieId);
        if (usuarioSerieOpt.isEmpty()) return ResponseEntity.badRequest().body("No se encontró la serie");
        usuarioSerieRepository.delete(usuarioSerieOpt.get());
        return ResponseEntity.ok("Serie eliminada correctamente.");
    }
}
