package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Resultado {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idResultado;
    private String nombre;
    private String medicoFirmante;
    private String tipoMuestra;
    private byte[] archivo;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;

    public Resultado() {
    }
    
    public int getIdResultado() {
        return idResultado;
    }

    public void setIdResultado(int idResultado) {
        this.idResultado = idResultado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getMedicoFirmante() {
        return medicoFirmante;
    }

    public void setMedicoFirmante(String medicoFirmante) {
        this.medicoFirmante = medicoFirmante;
    }

    public String getTipoMuestra() {
        return tipoMuestra;
    }

    public void setTipoMuestra(String tipoMuestra) {
        this.tipoMuestra = tipoMuestra;
    }

    public byte[] getArchivo() {
        return archivo;
    }

    public void setArchivo(byte[] archivo) {
        this.archivo = archivo;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
    
}
