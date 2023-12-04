package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class Diagnostico {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idDiagnostico=0;
    private String idCiex;
    private String ciex;
    private String descripcionCiex;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;
    private CategoriaDiagnostico categoria;
    public Diagnostico() {
    }

    public int getIdDiagnostico() {
        return idDiagnostico;
    }

    public void setIdDiagnostico(int idDiagnostico) {
        this.idDiagnostico = idDiagnostico;
    }

    public String getIdCiex() {
        return idCiex;
    }

    public void setIdCiex(String idCiex) {
        this.idCiex = idCiex;
    }

    public String getCiex() {
        return ciex;
    }

    public void setCiex(String ciex) {
        this.ciex = ciex;
    }

    public String getDescripcionCiex() {
        return descripcionCiex;
    }

    public void setDescripcionCiex(String descripcionCiex) {
        this.descripcionCiex = descripcionCiex;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public CategoriaDiagnostico getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaDiagnostico categoria) {
        this.categoria = categoria;
    }
}
