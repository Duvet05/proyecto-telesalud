package com.minsa.sanama.model.admision;

import com.minsa.sanama.model.rrhh.Enfermera;
import java.time.LocalDate;
import java.time.LocalTime;

public class Triaje {
    private int idTriaje;
    private String codigoTriaje;
    private int peso;
    private int talla;
    private int temperatura;
    private String motivoVisita;
    private int presionArterial;
    private int estado;
    private String prioridad;
    private LocalDate fechaTriaje;
    private LocalTime horaTriaje;
    private String saturacionOxigeno;
    private String frecuenciaCardiaca;
    private String frecuenciaRespiratoria;
    private String nivelConciencia;
    private String nivelDolor;
    private String condicionesPrexistentes;
    private Enfermera enfermera;

    public Triaje() {
    }
    
    public Enfermera getEnfermera() {
        return enfermera;
    }

    public void setEnfermera(Enfermera enfermera) {
        this.enfermera = enfermera;
    }
    
    public int getIdTriaje() {
        return idTriaje;
    }

    public void setIdTriaje(int idTriaje) {
        this.idTriaje = idTriaje;
    }

    public String getCodigoTriaje() {
        return codigoTriaje;
    }

    public void setCodigoTriaje(String codigoTriaje) {
        this.codigoTriaje = codigoTriaje;
    }

    public int getPeso() {
        return peso;
    }

    public void setPeso(int peso) {
        this.peso = peso;
    }

    public int getTalla() {
        return talla;
    }

    public void setTalla(int talla) {
        this.talla = talla;
    }

    public int getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(int temperatura) {
        this.temperatura = temperatura;
    }

    public String getMotivoVisita() {
        return motivoVisita;
    }

    public void setMotivoVisita(String motivoVisita) {
        this.motivoVisita = motivoVisita;
    }

    public int getPresionArterial() {
        return presionArterial;
    }

    public void setPresionArterial(int presionArterial) {
        this.presionArterial = presionArterial;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
    
    public String getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(String prioridad) {
        this.prioridad = prioridad;
    }

    public LocalDate getFechaTriaje() {
        return fechaTriaje;
    }

    public void setFechaTriaje(LocalDate fechaTriaje) {
        this.fechaTriaje = fechaTriaje;
    }

    public LocalTime getHoraTriaje() {
        return horaTriaje;
    }

    public void setHoraTriaje(LocalTime horaTriaje) {
        this.horaTriaje = horaTriaje;
    }

    public String getSaturacionOxigeno() {
        return saturacionOxigeno;
    }

    public void setSaturacionOxigeno(String saturacionOxigeno) {
        this.saturacionOxigeno = saturacionOxigeno;
    }

    public String getFrecuenciaCardiaca() {
        return frecuenciaCardiaca;
    }

    public void setFrecuenciaCardiaca(String frecuenciaCardiaca) {
        this.frecuenciaCardiaca = frecuenciaCardiaca;
    }

    public String getFrecuenciaRespiratoria() {
        return frecuenciaRespiratoria;
    }

    public void setFrecuenciaRespiratoria(String frecuenciaRespiratoria) {
        this.frecuenciaRespiratoria = frecuenciaRespiratoria;
    }

    public String getNivelConciencia() {
        return nivelConciencia;
    }

    public void setNivelConciencia(String nivelConciencia) {
        this.nivelConciencia = nivelConciencia;
    }

    public String getNivelDolor() {
        return nivelDolor;
    }

    public void setNivelDolor(String nivelDolor) {
        this.nivelDolor = nivelDolor;
    }

    public String getCondicionesPrexistentes() {
        return condicionesPrexistentes;
    }

    public void setCondicionesPrexistentes(String condicionesPrexistentes) {
        this.condicionesPrexistentes = condicionesPrexistentes;
    }
}
