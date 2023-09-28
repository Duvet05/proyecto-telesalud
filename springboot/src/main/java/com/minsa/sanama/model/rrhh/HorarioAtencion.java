package com.minsa.sanama.model.rrhh;

import java.util.ArrayList;
import java.util.Date;

public class HorarioAtencion {
    private int idHorarioAtencion;
    private Date fechaIni;
    private Date fechaFin;
    private int estado;
    private ArrayList<TurnoAtencion> turnosAtencion;

    public HorarioAtencion() {
    }

    public int getIdHorarioAtencion() {
        return idHorarioAtencion;
    }

    public void setIdHorarioAtencion(int idHorarioAtencion) {
        this.idHorarioAtencion = idHorarioAtencion;
    }

    public Date getFechaIni() {
        return fechaIni;
    }

    public void setFechaIni(Date fechaIni) {
        this.fechaIni = fechaIni;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

    public ArrayList<TurnoAtencion> getTurnosAtencion() {
        return turnosAtencion;
    }

    public void setTurnosAtencion(ArrayList<TurnoAtencion> turnosAtencion) {
        this.turnosAtencion = turnosAtencion;
    }
    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
    
    
}
