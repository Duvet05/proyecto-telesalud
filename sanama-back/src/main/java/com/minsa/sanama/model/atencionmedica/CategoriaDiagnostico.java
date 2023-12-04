package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoriaDiagnostico {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idCategoriaDiagnostico=0;
    private String categoria;
    private String grupo;
    private String capitulo;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;

    public CategoriaDiagnostico(){}

    public int getIdCategoriaDiagnostico() {
        return idCategoriaDiagnostico;
    }

    public void setIdCategoriaDiagnostico(int idCategoriaDiagnostico) {
        this.idCategoriaDiagnostico = idCategoriaDiagnostico;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    public String getCapitulo() {
        return capitulo;
    }

    public void setCapitulo(String capitulo) {
        this.capitulo = capitulo;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
}
