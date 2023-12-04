package com.minsa.sanama.services.atencion;

import com.minsa.sanama.model.atencionmedica.Diagnostico;
import com.minsa.sanama.repository.atencionmedica.DiagnosticoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiagnosticoService {
    @Autowired
    DiagnosticoRepository diagnosticoRepository;

    public List<Diagnostico> listarDiagnosticos(String diagnostico) {
        List<Diagnostico> ldiagnosticos;
        ldiagnosticos = diagnosticoRepository.listarDiagnosticoFiltro(diagnostico);

        return ldiagnosticos;
    }
}
