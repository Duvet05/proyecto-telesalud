package com.minsa.sanama.model.laboratorio;

import java.util.ArrayList;
import com.minsa.sanama.model.admision.ProgramacionCita;
import com.minsa.sanama.model.rrhh.Enfermera;

public class CitaLaboratorio extends ProgramacionCita{
    private String codigoCitaLaboratorio;
    private ArrayList<ExamenMedico> examenesMedicos;
    private Enfermera enfermera;
    private int estado;

    public CitaLaboratorio() {
    }
    
    public Enfermera getEnfermera() {
        return enfermera;
    }

    public void setEnfermera(Enfermera enfermera) {
        this.enfermera = enfermera;
    }

    public String getCodigoCitaLaboratorio() {
        return codigoCitaLaboratorio;
    }

    public void setCodigoCitaLaboratorio(String codigoCitaLaboratorio) {
        this.codigoCitaLaboratorio = codigoCitaLaboratorio;
    }

    public ArrayList<ExamenMedico> getExamenesMedicos() {
        return examenesMedicos;
    }

    public void setExamenesMedicos(ArrayList<ExamenMedico> examenesMedicos) {
        this.examenesMedicos = examenesMedicos;
    }
    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
}
