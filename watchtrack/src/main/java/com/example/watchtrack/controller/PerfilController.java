package com.example.watchtrack.controller;

import com.example.watchtrack.model.Usuario;
import com.example.watchtrack.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/perfil")
@CrossOrigin(origins = "http://localhost:4200") // Habilita CORS para Angular
public class PerfilController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsuario(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUsuario(@PathVariable Long id, @RequestBody Usuario datosActualizados) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombre(datosActualizados.getNombre());
            usuario.setEmail(datosActualizados.getEmail());
            usuarioRepository.save(usuario);
            return ResponseEntity.ok(usuario);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<?> cambiarContrasena(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isEmpty()) return ResponseEntity.notFound().build();

        String nuevaContrasena = request.get("password");
        if (nuevaContrasena == null || nuevaContrasena.isBlank()) {
            return ResponseEntity.badRequest().body("La contraseña no puede estar vacía.");
        }

        Usuario usuario = usuarioOpt.get();
        usuario.setPassword(passwordEncoder.encode(nuevaContrasena)); // ✅ cifrada
        usuarioRepository.save(usuario);

        return ResponseEntity.ok().body(Map.of("mensaje", "Contraseña actualizada"));

    }
}
