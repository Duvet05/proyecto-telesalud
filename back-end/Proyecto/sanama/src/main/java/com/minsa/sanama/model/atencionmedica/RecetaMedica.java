package com.minsa.sanama.model.atencionmedica;

import java.time.LocalDate;
import java.util.ArrayList;

public class RecetaMedica {
    private int idReceta;
    private String codigo;
    private LocalDate fechaEmision;
    private LocalDate fechaCaducidad;
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

    public LocalDate getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(LocalDate fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public LocalDate getFechaCaducidad() {
        return fechaCaducidad;
    }

    public void setFechaCaducidad(LocalDate fechaCaducidad) {
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
