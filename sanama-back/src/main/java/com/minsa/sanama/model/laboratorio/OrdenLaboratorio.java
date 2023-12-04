package com.minsa.sanama.model.laboratorio;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.minsa.sanama.model.atencionmedica.CitaMedica;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrdenLaboratorio {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idOrdenLaboratorio=0;
    private String codigoOrden;
    private String tipoMuestra;
    private String instrucciones;
    private String doctorFirmante;
    private LocalTime horaOrden;
    private LocalDate fechaOrden;
    private String observaciones;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;
    private CitaMedica citaMedica;
    private List<ExamenMedico> examenMedico;


    public OrdenLaboratorio() {
    }

    public int getIdOrdenLaboratorio() {
        return idOrdenLaboratorio;
    }

    public void setIdOrdenLaboratorio(int idOrdenLaboratorio) {
        this.idOrdenLaboratorio = idOrdenLaboratorio;
    }

    public String getCodigoOrden() {
        return codigoOrden;
    }

    public void setCodigoOrden(String codigoOrden) {
        this.codigoOrden = codigoOrden;
    }

    public String getTipoMuestra() {
        return tipoMuestra;
    }

    public void setTipoMuestra(String tipoMuestra) {
        this.tipoMuestra = tipoMuestra;
    }

    public String getInstrucciones() {
        return instrucciones;
    }

    public void setInstrucciones(String instrucciones) {
        this.instrucciones = instrucciones;
    }

    public String getDoctorFirmante() {
        return doctorFirmante;
    }

    public void setDoctorFirmante(String doctorFirmante) {
        this.doctorFirmante = doctorFirmante;
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

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public CitaMedica getCitaMedica() {
        return citaMedica;
    }

    public void setCitaMedica(CitaMedica citaMedica) {
        this.citaMedica = citaMedica;
    }

    public List<ExamenMedico> getExamenMedico() {
        return examenMedico;
    }

    public void setExamenMedico(List<ExamenMedico> examenMedico) {
        this.examenMedico = examenMedico;
    }
}
