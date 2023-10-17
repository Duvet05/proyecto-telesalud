package com.minsa.sanama.model.atencionmedica;

import com.minsa.sanama.model.laboratorio.ExamenMedico;

public class OrdenLaboratorio {
    private int idOrdenLaboratorio;
    private String tipoOrden;
    private String instrucciones;
    private int estado;
    private ExamenMedico examenMedico;

    public OrdenLaboratorio() {
    }

    public int getIdOrdenLaboratorio() {
        return idOrdenLaboratorio;
    }

    public void setIdOrdenLaboratorio(int idOrdenLaboratorio) {
        this.idOrdenLaboratorio = idOrdenLaboratorio;
    }

    public String getTipoOrden() {
        return tipoOrden;
    }

    public void setTipoOrden(String tipoOrden) {
        this.tipoOrden = tipoOrden;
    }

    public String getInstrucciones() {
        return instrucciones;
    }

    public void setInstrucciones(String instrucciones) {
        this.instrucciones = instrucciones;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public ExamenMedico getExamenMedico() {
        return examenMedico;
    }

    public void setExamenMedico(ExamenMedico examenMedico) {
        this.examenMedico = examenMedico;
    }

}
