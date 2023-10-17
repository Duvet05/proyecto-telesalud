package com.minsa.sanama.model.rrhh;

import java.util.ArrayList;
import com.minsa.sanama.model.admision.Persona;

public class Medico extends Persona {
    private String area;
    private String cmp;

    private Especialidad especialidad;
    private ArrayList<HorarioAtencion> horariosAtencion;
    // private ArrayList<ProgramacionCita> programacionesCitas;

    public Medico() {
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCmp() {
        return cmp;
    }

    public void setCmp(String cmp) {
        this.cmp = cmp;
    }

    public Especialidad getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(Especialidad especialidad) {
        this.especialidad = especialidad;
    }

    public ArrayList<HorarioAtencion> getHorariosAtencion() {
        return horariosAtencion;
    }

    public void setHorariosAtencion(ArrayList<HorarioAtencion> horariosAtencion) {
        this.horariosAtencion = horariosAtencion;
    }
    /*
     * public ArrayList<ProgramacionCita> getProgramacionesCitas() {
     * return programacionesCitas;
     * }
     * 
     * public void setProgramacionesCitas(ArrayList<ProgramacionCita>
     * programacionesCitas) {
     * this.programacionesCitas = programacionesCitas;
     * }
     */

}
