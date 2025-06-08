package com.example.watchtrack.controller;

import com.example.watchtrack.model.Usuario;
import com.example.watchtrack.repository.UsuarioRepository;
import com.example.watchtrack.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Usuario usuario) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(Collections.singletonMap("message", "Email ya registrado."));
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuarioRepository.save(usuario);
        return ResponseEntity.ok(Collections.singletonMap("message", "Usuario registrado con éxito."));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Usuario usuario) {
        Optional<Usuario> userOptional = usuarioRepository.findByEmail(usuario.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(Collections.singletonMap("message", "Usuario no encontrado."));
        }

        Usuario user = userOptional.get();

        if (!passwordEncoder.matches(usuario.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(Collections.singletonMap("message", "Contraseña incorrecta."));
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getNombre());

        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Funciona sin problemas");
    }

    @GetMapping("/private-ping")
    public ResponseEntity<String> privatePing() {
        return ResponseEntity.ok("Acceso autorizado, token válido.");
    }
}
