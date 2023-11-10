package com.minsa.sanama.model.atencionmedica;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.minsa.sanama.model.rrhh.Medico;

import java.time.LocalDate;
import java.util.ArrayList;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HojaMedica {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int idHojaClinica=0;
    private String codigo;
    private LocalDate proximaCita;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int estado=0;
    // private ArrayList<CitaMedica> citasMedicas;
    private Diagnostico diagnostico;
    private ArrayList<Resultado> resultados;
    private RecetaMedica recetaMedica;

    private Medico medicoAsignado;

    private byte[] sello;

    public int getIdHojaClinica() {
        return idHojaClinica;
    }

    public void setIdHojaClinica(int idHojaClinica) {
        this.idHojaClinica = idHojaClinica;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalDate getProximaCita() {
        return proximaCita;
    }

    public void setProximaCita(LocalDate fecha) {
        this.proximaCita = proximaCita;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    /*
     * public ArrayList<CitaMedica> getCitasMedicas() {
     * return citasMedicas;
     * }
     * 
     * public void setCitasMedicas(ArrayList<CitaMedica> citasMedicas) {
     * this.citasMedicas = citasMedicas;
     * }
     */
    public Diagnostico getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(Diagnostico diagnostico) {
        this.diagnostico = diagnostico;
    }

    public ArrayList<Resultado> getResultados() {
        return resultados;
    }

    public void setResultados(ArrayList<Resultado> resultados) {
        this.resultados = resultados;
    }

    public RecetaMedica getRecetaMedica() {
        return recetaMedica;
    }

    public void setRecetaMedica(RecetaMedica recetaMedica) {
        this.recetaMedica = recetaMedica;
    }

    public Medico getMedico() {
        return medicoAsignado;
    }

    public void setMedico(Medico medico) {
        this.medicoAsignado = medicoAsignado;
    }

    public byte[] getSello() {
        return sello;
    }

    public void setSello(byte[] sello) {
        this.sello = sello;
    }

}
