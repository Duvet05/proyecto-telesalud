package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.minsa.sanama.model.admision.ProgramacionCita;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CitaMedica extends ProgramacionCita{
    private String codigoCitaMedica;
    private HojaMedica hojaMedica;
    private OrdenLaboratorio ordenLaboratorio;
    private int requiereTriaje;
    private boolean tieneAcompanhante;
    private String nombreAcompanhante;
    private String dniAcompanhante;
    private String parentezco;


    public CitaMedica() {
    }

    public String getCodigoCitaMedica() {
        return codigoCitaMedica;
    }

    public void setCodigoCitaMedica(String codigoCitaMedica) {
        this.codigoCitaMedica = codigoCitaMedica;
    }

    public HojaMedica getHojaMedica() {
        return hojaMedica;
    }

    public void setHojaMedica(HojaMedica hojaMedica) {
        this.hojaMedica = hojaMedica;
    }

    public OrdenLaboratorio getOrdenLaboratorio() {
        return ordenLaboratorio;
    }

    public void setOrdenLaboratorio(OrdenLaboratorio ordenLaboratorio) {
        this.ordenLaboratorio = ordenLaboratorio;
    }

    public int getRequiereTriaje() {
        return requiereTriaje;
    }

    public void setRequiereTriaje(int requiereTriaje) {
        this.requiereTriaje = requiereTriaje;
    }
    public boolean isTieneAcompanhante() {
        return tieneAcompanhante;
    }

    public void setTieneAcompanhante(boolean tieneAcompanhante) {
        this.tieneAcompanhante = tieneAcompanhante;
    }

    public String getNombreAcompanhante() {
        return nombreAcompanhante;
    }

    public void setNombreAcompanhante(String nombreAcompanhante) {
        this.nombreAcompanhante = nombreAcompanhante;
    }

    public String getDniAcompanhante() {
        return dniAcompanhante;
    }

    public void setDniAcompanhante(String dniAcompanhante) {
        this.dniAcompanhante = dniAcompanhante;
    }

    public String getParentezco() {
        return parentezco;
    }

    public void setParentezco(String parentezco) {
        this.parentezco = parentezco;
    }
}
