package com.minsa.sanama.model.rrhh;

import java.util.ArrayList;
import com.minsa.sanama.model.admision.Persona;

public class Enfermera extends Persona {
    private String area;
    private String numeroLicencia;
    // private ArrayList<CitaLaboratorio> citasLaboratorio;
    // private ArrayList<Triaje> triajes;
    private ArrayList<HorarioAtencion> horariosAtencion;

    public Enfermera() {
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getNumeroLicencia() {
        return numeroLicencia;
    }

    public void setNumeroLicencia(String numeroLicencia) {
        this.numeroLicencia = numeroLicencia;
    }

    /*
     * public ArrayList<CitaLaboratorio> getCitasLaboratorio() {
     * return citasLaboratorio;
     * }
     * 
     * public void setCitasLaboratorio(ArrayList<CitaLaboratorio> citasLaboratorio)
     * {
     * this.citasLaboratorio = citasLaboratorio;
     * }
     * 
     * public ArrayList<Triaje> getTriajes() {
     * return triajes;
     * }
     * 
     * public void setTriajes(ArrayList<Triaje> triajes) {
     * this.triajes = triajes;
     * }
     */
    public ArrayList<HorarioAtencion> getHorariosAtencion() {
        return horariosAtencion;
    }

    public void setHorariosAtencion(ArrayList<HorarioAtencion> horariosAtencion) {
        this.horariosAtencion = horariosAtencion;
    }

}
