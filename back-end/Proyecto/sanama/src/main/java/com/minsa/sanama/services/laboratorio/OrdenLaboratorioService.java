package com.minsa.sanama.services.laboratorio;

import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.repository.laboratorio.OrdenLaboratorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdenLaboratorioService {
    @Autowired
    OrdenLaboratorioRepository ordenLaboratorioRepository;

    public List<OrdenLaboratorio> listarOrdenLaboratorioFiltro(String pv_filtro, String pd_fecha_inicio, String pd_fecha_fin) {
        List<OrdenLaboratorio> lordenes;
        lordenes = ordenLaboratorioRepository.listarOrdenLaboratorioFiltro(pv_filtro, pd_fecha_inicio, pd_fecha_fin);
        return lordenes;
    }
}
