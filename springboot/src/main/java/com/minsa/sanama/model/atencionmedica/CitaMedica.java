package com.minsa.sanama.model.atencionmedica;

import java.util.ArrayList;
import com.minsa.sanama.model.admision.ProgramacionCita;


public class CitaMedica extends ProgramacionCita{
    private String codigoCitaMedica;
    private HojaMedica hojaMedica;
    private ArrayList<OrdenLaboratorio> ordenesLaboratorio;

    public CitaMedica() {
    }
    
    public String getCodigoCitaMedica() {
        return codigoCitaMedica;
    }

    public void setCodigoCitaMedica(String codigoCitaMedica) {
        this.codigoCitaMedica = codigoCitaMedica;
    }

    public HojaMedica getHojaMedica() {
        return hojaMedica;
    }

    public void setHojaMedica(HojaMedica hojaMedica) {
        this.hojaMedica = hojaMedica;
    }
    
    public ArrayList<OrdenLaboratorio> getOrdenesLaboratorio() {
        return ordenesLaboratorio;
    }

    public void setOrdenesLaboratorio(ArrayList<OrdenLaboratorio> ordenesLaboratorio) {
        this.ordenesLaboratorio = ordenesLaboratorio;
    }
    
    
    
}
