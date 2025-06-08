package com.example.watchtrack.model;

import jakarta.persistence.*;

@Entity
public class UsuarioPelicula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "pelicula_id", nullable = false)
    private Pelicula pelicula;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoPelicula estado;

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Pelicula getPelicula() {
        return pelicula;
    }

    public void setPelicula(Pelicula pelicula) {
        this.pelicula = pelicula;
    }

    public EstadoPelicula getEstado() {
        return estado;
    }

    public void setEstado(EstadoPelicula estado) {
        this.estado = estado;
    }

    // Accesos rápidos
    public Long getUsuarioId() {
        return usuario != null ? usuario.getId() : null;
    }

    public Long getPeliculaId() {
        return pelicula != null ? pelicula.getId() : null;
    }

    public enum EstadoPelicula {
        VISTA,
        POR_VER
    }
}
