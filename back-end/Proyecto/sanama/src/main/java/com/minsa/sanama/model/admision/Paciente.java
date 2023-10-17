package com.minsa.sanama.model.admision;

import java.util.ArrayList;
import com.minsa.sanama.model.atencionmedica.HistorialClinico;

public class  Paciente extends Persona{
    private String codigoSeguro;
    private String tipoSeguro;
    private boolean tieneAcompanhante;
    private String nombreAcompnhante;
    private String dniAcompanhante;
    private String correo;
    private String direccion;

    private String parentezco;
    private HistorialClinico historialClinico;
    private ArrayList<ProgramacionCita>  programacionesCitas;

    public Paciente() {

    }
    
    public String getCodigoSeguro() {
        return codigoSeguro;
    }

    public void setCodigoSeguro(String codigoSeguro) {
        this.codigoSeguro = codigoSeguro;
    }

    public String getTipoSeguro() {
        return tipoSeguro;
    }

    public void setTipoSeguro(String tipoSeguro) {
        this.tipoSeguro = tipoSeguro;
    }

    public HistorialClinico getHistorialClinico() {
        return historialClinico;
    }

    public void setHistorialClinico(HistorialClinico historialClinico) {
        this.historialClinico = historialClinico;
    }

    public ArrayList<ProgramacionCita> getProgramacionesCitas() {
        return programacionesCitas;
    }

    public void setProgramacionesCitas(ArrayList<ProgramacionCita> programacionesCitas) {
        this.programacionesCitas = programacionesCitas;
    }

    public boolean isTieneAcompanhante() {
        return tieneAcompanhante;
    }

    public void setTieneAcompanhante(boolean tieneAcompanhante) {
        this.tieneAcompanhante = tieneAcompanhante;
    }

    public String getNombreAcompnhante() {
        return nombreAcompnhante;
    }

    public void setNombreAcompnhante(String nombreAcompnhante) {
        this.nombreAcompnhante = nombreAcompnhante;
    }

    public String getDniAcompanhante() {
        return dniAcompanhante;
    }

    public void setDniAcompanhante(String dniAcompanhante) {
        this.dniAcompanhante = dniAcompanhante;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getParentezco() {
        return parentezco;
    }

    public void setParentezco(String parentezco) {
        this.parentezco = parentezco;
    }
}
