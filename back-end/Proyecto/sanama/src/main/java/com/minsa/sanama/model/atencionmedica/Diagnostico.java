package com.minsa.sanama.model.atencionmedica;

import java.util.ArrayList;

public class Diagnostico {
    private int idDiagnostico;
    private String descripcion;
    private Boolean presuntivo;
    private int estado;
    private String tratamiento;
    private ArrayList<EnfermedadEstandar> enfermedadesEstandar;

    public Diagnostico() {
    }
    
    public int getIdDiagnostico() {
        return idDiagnostico;
    }

    public void setIdDiagnostico(int idDiagnostico) {
        this.idDiagnostico = idDiagnostico;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean getPresuntivo() {
        return presuntivo;
    }

    public void setPresuntivo(Boolean presuntivo) {
        this.presuntivo = presuntivo;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public String getTratamiento() {
        return tratamiento;
    }

    public void setTratamiento(String tratamiento) {
        this.tratamiento = tratamiento;
    }

    public ArrayList<EnfermedadEstandar> getEnfermedadesEstandar() {
        return enfermedadesEstandar;
    }

    public void setEnfermedadesEstandar(ArrayList<EnfermedadEstandar> enfermedadesEstandar) {
        this.enfermedadesEstandar = enfermedadesEstandar;
    }
    
    
    
}
