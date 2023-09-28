package com.minsa.sanama.model.rrhh;

import java.util.ArrayList;
import com.minsa.sanama.model.admision.Persona;

public class Administrativo extends Persona{
    private String area;
    private byte[] certificacionSistema;
    private ArrayList<HorarioAtencion> horariosAtencion;

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public byte[] getCertificacionSistema() {
        return certificacionSistema;
    }

    public void setCertificacionSistema(byte[] certificacionSistema) {
        this.certificacionSistema = certificacionSistema;
    }

    public ArrayList<HorarioAtencion> getHorariosAtencion() {
        return horariosAtencion;
    }

    public void setHorariosAtencion(ArrayList<HorarioAtencion> horariosAtencion) {
        this.horariosAtencion = horariosAtencion;
    }
}
