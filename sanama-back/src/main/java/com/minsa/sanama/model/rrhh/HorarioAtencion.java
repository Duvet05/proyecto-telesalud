package com.minsa.sanama.model.rrhh;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDate;
import java.util.ArrayList;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HorarioAtencion {
    private int idHorarioAtencion;
    private LocalDate fechaIni;
    private LocalDate fechaFin;
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

    public LocalDate getFechaIni() {
        return fechaIni;
    }

    public void setFechaIni(LocalDate fechaIni) {
        this.fechaIni = fechaIni;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
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
