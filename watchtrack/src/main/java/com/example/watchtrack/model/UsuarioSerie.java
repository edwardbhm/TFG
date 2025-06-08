package com.example.watchtrack.model;

import jakarta.persistence.*;

@Entity
public class UsuarioSerie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "serie_id")
    private Serie serie;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoSerie estado;

    public enum EstadoSerie {
        VIENDO,
        VISTA,
        POR_VER
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Serie getSerie() { return serie; }
    public void setSerie(Serie serie) { this.serie = serie; }

    public EstadoSerie getEstado() { return estado; }
    public void setEstado(EstadoSerie estado) { this.estado = estado; }
}
