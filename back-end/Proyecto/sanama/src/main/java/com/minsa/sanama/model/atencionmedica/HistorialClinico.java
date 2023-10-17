package com.minsa.sanama.model.atencionmedica;

import java.util.ArrayList;

public class HistorialClinico {
    private int idHistorialClinico;
    private String codigo;
    private int estado;
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
