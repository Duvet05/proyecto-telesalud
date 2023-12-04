package com.minsa.sanama.services.atencion;

import com.minsa.sanama.model.atencionmedica.HistorialClinico;
import com.minsa.sanama.repository.atencionmedica.HistorialClinicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistorialClinicoService {
    @Autowired
    HistorialClinicoRepository historialClinicoRepository;
    public HistorialClinico buscarHistorialClinico(String pn_id_paciente) {
        HistorialClinico historialClinico=null;
        historialClinico = historialClinicoRepository.buscarHistorialClinico(pn_id_paciente);
        return historialClinico;
    }
}
