package com.minsa.sanama.model.atencionmedica;

import java.util.ArrayList;

public class HistorialClinico {
    private int idHistorialClinico;
    private String codigo;
    private String condicionantes;
    private String alergias;
    private String actualesMedicamentos;
    private String operaciones;
    private String hospitalizaciones;
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

    public String getCondicionantes() {
        return condicionantes;
    }

    public void setCondicionantes(String condicionantes) {
        this.condicionantes = condicionantes;
    }

    public String getAlergias() {
        return alergias;
    }

    public void setAlergias(String alergias) {
        this.alergias = alergias;
    }

    public String getActualesMedicamentos() {
        return actualesMedicamentos;
    }

    public void setActualesMedicamentos(String actualesMedicamentos) {
        this.actualesMedicamentos = actualesMedicamentos;
    }

    public String getOperaciones() {
        return operaciones;
    }

    public void setOperaciones(String operaciones) {
        this.operaciones = operaciones;
    }

    public String getHospitalizaciones() {
        return hospitalizaciones;
    }

    public void setHospitalizaciones(String hospitalizaciones) {
        this.hospitalizaciones = hospitalizaciones;
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
