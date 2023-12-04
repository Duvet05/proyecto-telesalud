package com.minsa.sanama.services.configuracion;

import com.minsa.sanama.model.configuracion.LookupValue;
import com.minsa.sanama.repository.configuracion.LookupValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class LookupValueService {
    @Autowired
    LookupValueRepository valueRepository;

    public List<LookupValue> listarParentezcos() {
        List<LookupValue> lvalores;
        lvalores = valueRepository.listarValoresParentezcos();
        return lvalores;
    }

    public List<LookupValue> listarSeguros() {
        List<LookupValue> lvalores;
        lvalores = valueRepository.listarValoresSeguros();
        return lvalores;
    }

    public List<LookupValue> listarMedicosLab() {
        List<LookupValue> lmedicos;
        lmedicos = valueRepository.listarMedicosLab();
        return lmedicos;
    }

    public List<LookupValue> listarEstadosCitas() {
        List<LookupValue> lcitas;
        lcitas = valueRepository.listarEstadosCitas();
        return lcitas;
    }

    public List<LookupValue> listarEstadosCitasOrdenes() {
        List<LookupValue> lcitas;
        lcitas = valueRepository.listarEstadosCitasOrdenes();
        return lcitas;
    }

    public LookupValue getStatusCita(int pn_id_cita) {
        LookupValue cita;
        cita = valueRepository.getStatusCita(pn_id_cita).get(0);
        return cita;
    }

}
