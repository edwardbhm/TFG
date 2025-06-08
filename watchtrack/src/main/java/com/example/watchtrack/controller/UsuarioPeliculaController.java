package com.example.watchtrack.controller;

import com.example.watchtrack.model.Pelicula;
import com.example.watchtrack.model.Usuario;
import com.example.watchtrack.model.UsuarioPelicula;
import com.example.watchtrack.model.UsuarioPelicula.EstadoPelicula;
import com.example.watchtrack.repository.PeliculaRepository;
import com.example.watchtrack.repository.UsuarioPeliculaRepository;
import com.example.watchtrack.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usuario-peliculas")
public class UsuarioPeliculaController {

    @Autowired
    private UsuarioPeliculaRepository usuarioPeliculaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PeliculaRepository peliculaRepository;

    // ✅ Obtener todas las películas guardadas por un usuario
    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<UsuarioPelicula>> getPeliculasByUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(usuarioPeliculaRepository.findByUsuario_Id(usuarioId));
    }

    // ✅ Añadir o actualizar estado de una película (crea la película si no existe)
    @PostMapping("/guardar")
    public ResponseEntity<?> guardarPelicula(
            @RequestParam Long usuarioId,
            @RequestParam Long peliculaId, // este es el tmdbId
            @RequestParam EstadoPelicula estado,
            @RequestParam String titulo,
            @RequestParam String sinopsis,
            @RequestParam int duracion,
            @RequestParam String imagen
    ) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        Pelicula pelicula = peliculaRepository.findByTmdbId(peliculaId)
                .orElseGet(() -> {
                    Pelicula nueva = new Pelicula();
                    nueva.setTmdbId(peliculaId);
                    nueva.setTitulo(titulo);
                    nueva.setSinopsis(sinopsis);
                    nueva.setDuracion(duracion);
                    nueva.setImagen(imagen);
                    return peliculaRepository.save(nueva);
                });

        Usuario usuario = usuarioOpt.get();

        UsuarioPelicula usuarioPelicula = usuarioPeliculaRepository
                .findByUsuario_IdAndPelicula_TmdbId(usuarioId, peliculaId)
                .orElse(new UsuarioPelicula());

        usuarioPelicula.setUsuario(usuario);
        usuarioPelicula.setPelicula(pelicula);
        usuarioPelicula.setEstado(estado);

        usuarioPeliculaRepository.save(usuarioPelicula);

        return ResponseEntity.ok("Película guardada/actualizada correctamente.");
    }

    // ✅ Eliminar una película de la lista del usuario
    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarPelicula(@RequestParam Long usuarioId, @RequestParam Long peliculaId) {
        Optional<UsuarioPelicula> usuarioPeliculaOpt = usuarioPeliculaRepository.findByUsuario_IdAndPelicula_TmdbId(usuarioId, peliculaId);

        if (usuarioPeliculaOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No se encontró la película en la lista del usuario.");
        }

        usuarioPeliculaRepository.delete(usuarioPeliculaOpt.get());

        return ResponseEntity.ok("Película eliminada correctamente.");
    }
}
