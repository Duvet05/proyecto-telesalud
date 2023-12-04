package com.minsa.sanama.services.laboratorio;

import com.minsa.sanama.model.laboratorio.ExamenMedico;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.repository.laboratorio.ExamenMedicoRepository;
import com.minsa.sanama.repository.laboratorio.OrdenLaboratorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdenLaboratorioService {
    @Autowired
    OrdenLaboratorioRepository ordenLaboratorioRepository;
    @Autowired
    ExamenMedicoRepository examenMedicoRepository;

    public List<OrdenLaboratorio> listarOrdenLaboratorioFiltro(String pv_filtro, String pd_fecha_inicio, String pd_fecha_fin, List<String> estados) {
        List<OrdenLaboratorio> lordenes;
        //List<ExamenMedico> lexamenes;
        lordenes = ordenLaboratorioRepository.listarOrdenLaboratorioFiltro(pv_filtro, pd_fecha_inicio, pd_fecha_fin, estados);
        /*
        for(OrdenLaboratorio orden : lordenes){
            lexamenes = examenMedicoRepository.buscarExamenMedico(String.valueOf(orden.getIdOrdenLaboratorio()));
            orden.setExamenMedico(lexamenes);
        }
        */
        return lordenes;
    }

    public OrdenLaboratorio buscarOrdenLaboratorio(String pn_id_orden_laboratorio) {
        OrdenLaboratorio ordenLaboratorio=null;
        List<ExamenMedico> lexamenes;
        List<OrdenLaboratorio> lordenes;
        lordenes = ordenLaboratorioRepository.buscarOrdenLaboratorio(pn_id_orden_laboratorio);
        if(!lordenes.isEmpty()){
            ordenLaboratorio = lordenes.get(0);
            lexamenes = examenMedicoRepository.buscarExamenMedico(pn_id_orden_laboratorio);
            ordenLaboratorio.setExamenMedico(lexamenes);
        }
        return ordenLaboratorio;
    }

    public int atenderOrdenLaboratorioV1(OrdenLaboratorio orden){
        List<ExamenMedico> lexamenes=null;
        int valido;
        valido = ordenLaboratorioRepository.atenderOrdenLaboratorioV1(orden);
        lexamenes = orden.getExamenMedico();
        if(valido==1){
            for (ExamenMedico examen : lexamenes) {
                examenMedicoRepository.registrarExamenMedico(examen,orden.getIdOrdenLaboratorio());
            }
            return 1;
        }
        return -1;
    }

    public int registrarOrdenLaboratorio(OrdenLaboratorio orden){
        int n;
        n = ordenLaboratorioRepository.registrarOrdenLaboratorio(orden);
        return n;
    }

    public int actualizarOrdenLaboratorio(OrdenLaboratorio orden){
        List<ExamenMedico> lexamenes=null;
        int valido=0;
        valido = ordenLaboratorioRepository.actualizarOrdenLaboratorio(orden);
        lexamenes = orden.getExamenMedico();
        if(valido==1){
            for (ExamenMedico examen : lexamenes) {
                examenMedicoRepository.registrarExamenMedico(examen,orden.getIdOrdenLaboratorio());
            }
            return 1;
        }
        return -1;
    }

}
