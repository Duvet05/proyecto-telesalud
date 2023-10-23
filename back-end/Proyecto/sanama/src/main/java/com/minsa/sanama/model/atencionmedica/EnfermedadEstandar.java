package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class EnfermedadEstandar {
    private int idEnfermeraEstandar;
    private String codigo;
    private String nombre;
    private String descripcion;
    private int estado;

    public EnfermedadEstandar() {
    }
    
    public int getIdEnfermeraEstandar() {
        return idEnfermeraEstandar;
    }

    public void setIdEnfermeraEstandar(int idEnfermeraEstandar) {
        this.idEnfermeraEstandar = idEnfermeraEstandar;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
    
    
}
