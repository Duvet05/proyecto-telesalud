package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.ArrayList;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HistorialClinico {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idHistorialClinico=0;
    private String codigo;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;
    private ArrayList<HojaMedica> hojasMedicas;

    public HistorialClinico() {
    }
    
    public int getIdHistorialClinico() {
        return idHistorialClinico;
    }

    public void setIdHistorialClinico(int idHistorialClinico) {
        this.idHistorialClinico = idHistorialClinico;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public ArrayList<HojaMedica> getHojasMedicas() {
        return hojasMedicas;
    }

    public void setHojasMedicas(ArrayList<HojaMedica> hojasMedicas) {
        this.hojasMedicas = hojasMedicas;
    }
    
}
