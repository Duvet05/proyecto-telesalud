package com.minsa.sanama.model.laboratorio;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.minsa.sanama.model.atencionmedica.CitaMedica;

import java.time.LocalDate;
import java.time.LocalTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrdenLaboratorio {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idOrdenLaboratorio=0;
    private String tipoOrden;
    private String instrucciones;
    private LocalTime horaOrden;
    private LocalDate fechaOrden;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;
    private CitaMedica citaMedica;
    private ExamenMedico examenMedico;

    public OrdenLaboratorio() {
    }

    public LocalTime getHoraOrden() {
        return horaOrden;
    }

    public void setHoraOrden(LocalTime horaOrden) {
        this.horaOrden = horaOrden;
    }

    public LocalDate getFechaOrden() {
        return fechaOrden;
    }

    public void setFechaOrden(LocalDate fechaOrden) {
        this.fechaOrden = fechaOrden;
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

    public CitaMedica getCitaMedica() {
        return citaMedica;
    }

    public void setCitaMedica(CitaMedica citaMedica) {
        this.citaMedica = citaMedica;
    }
}
