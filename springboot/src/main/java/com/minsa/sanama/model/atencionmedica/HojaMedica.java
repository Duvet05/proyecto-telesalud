package com.minsa.sanama.model.atencionmedica;

import java.util.ArrayList;
import java.util.Date;

public class HojaMedica {
    private int idHojaClinica;
    private String codigo;
    private Date fecha;
    private int estado;
    //private ArrayList<CitaMedica> citasMedicas;
    private Diagnostico diagnostico;
    private ArrayList<Resultado> resultados;
    private RecetaMedica recetaMedica;

    public HojaMedica() {
    }
    
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

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
/*
    public ArrayList<CitaMedica> getCitasMedicas() {
        return citasMedicas;
    }

    public void setCitasMedicas(ArrayList<CitaMedica> citasMedicas) {
        this.citasMedicas = citasMedicas;
    }
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
    
    
}
