package com.minsa.sanama.model.atencionmedica;

import java.util.ArrayList;
import java.util.Date;

public class RecetaMedica {
    private int idReceta;
    private String codigo;
    private Date fechaEmision;
    private Date fechaCaducidad;
    private int estado;
    private ArrayList<MedicamentoRecetado> medicamentosRecetados;

    public RecetaMedica() {
    }
    
    public int getIdReceta() {
        return idReceta;
    }

    public void setIdReceta(int idReceta) {
        this.idReceta = idReceta;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Date getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(Date fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public Date getFechaCaducidad() {
        return fechaCaducidad;
    }

    public void setFechaCaducidad(Date fechaCaducidad) {
        this.fechaCaducidad = fechaCaducidad;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public ArrayList<MedicamentoRecetado> getMedicamentosRecetados() {
        return medicamentosRecetados;
    }

    public void setMedicamentosRecetados(ArrayList<MedicamentoRecetado> medicamentosRecetados) {
        this.medicamentosRecetados = medicamentosRecetados;
    }
    
    
}
