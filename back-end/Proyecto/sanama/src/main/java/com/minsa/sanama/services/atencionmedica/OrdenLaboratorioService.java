package com.minsa.sanama.services.atencionmedica;

import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.repository.atencionmedica.OrdenLaboratorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdenLaboratorioService {
    @Autowired
    OrdenLaboratorioRepository ordenLaboratorioRepository;

    public List<CitaMedica> listarOrdenLaboratorioxFiltro(String pv_filtro, String pn_estado, String pd_fecha_inicio, String pd_fecha_fin) {
        List<CitaMedica> lCitas;
        lCitas = ordenLaboratorioRepository.listarOrdenLaboratorioxFiltro(pv_filtro, pn_estado, pd_fecha_inicio, pd_fecha_fin);
        return lCitas;
    }
}
