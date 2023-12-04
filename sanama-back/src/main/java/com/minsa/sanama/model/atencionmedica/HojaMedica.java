package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class HojaMedica {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idHojaMedica=0;
    private HojaRefencia hojaRefencia;
    private String codigo;
    private LocalTime horaAtencion;
    private LocalDate fechaAtencion;
    private byte[] firma;
    private String medicoConsulta;
    private String observaciones;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idCitaMedica=0;
    private CitaMedica citaMedica;
    private List<Resultado> resultados;
    private RecetaMedica recetaMedica;
    private EvaluacionMedica evaluacionMedica;

    public HojaMedica() {
    }

    public int getIdHojaMedica() {
        return idHojaMedica;
    }

    public void setIdHojaMedica(int idHojaMedica) {
        this.idHojaMedica = idHojaMedica;
    }

    public CitaMedica getCitaMedica() {
        return citaMedica;
    }

    public void setCitaMedica(CitaMedica citaMedica) {
        this.citaMedica = citaMedica;
    }

    public HojaRefencia getHojaRefencia() {
        return hojaRefencia;
    }

    public void setHojaRefencia(HojaRefencia hojaRefencia) {
        this.hojaRefencia = hojaRefencia;
    }

    public int getIdCitaMedica() {
        return idCitaMedica;
    }

    public void setIdCitaMedica(int idCitaMedica) {
        this.idCitaMedica = idCitaMedica;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalTime getHoraAtencion() {
        return horaAtencion;
    }

    public void setHoraAtencion(LocalTime horaAtencion) {
        this.horaAtencion = horaAtencion;
    }

    public LocalDate getFechaAtencion() {
        return fechaAtencion;
    }

    public void setFechaAtencion(LocalDate fechaAtencion) {
        this.fechaAtencion = fechaAtencion;
    }

    public byte[] getFirma() {
        return firma;
    }

    public void setFirma(byte[] firma) {
        this.firma = firma;
    }

    public String getMedicoConsulta() {
        return medicoConsulta;
    }

    public void setMedicoConsulta(String medicoConsulta) {
        this.medicoConsulta = medicoConsulta;
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

    public List<Resultado> getResultados() {
        return resultados;
    }

    public void setResultados(List<Resultado> resultados) {
        this.resultados = resultados;
    }

    public RecetaMedica getRecetaMedica() {
        return recetaMedica;
    }

    public void setRecetaMedica(RecetaMedica recetaMedica) {
        this.recetaMedica = recetaMedica;
    }

    public EvaluacionMedica getEvaluacionMedica() {
        return evaluacionMedica;
    }

    public void setEvaluacionMedica(EvaluacionMedica evaluacionMedica) {
        this.evaluacionMedica = evaluacionMedica;
    }

}
