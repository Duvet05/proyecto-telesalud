package com.minsa.sanama.services.laboratorio;

import com.minsa.sanama.model.laboratorio.ExamenMedico;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.model.rrhh.Medico;
import com.minsa.sanama.model.rrhh.TurnoAtencion;
import com.minsa.sanama.repository.laboratorio.ExamenMedicoRepository;
import com.minsa.sanama.repository.rrhh.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExamenMedicoService {

    @Autowired
    ExamenMedicoRepository examenMedicoRepository;

    public int registrarExamenMedico(ExamenMedico examenMedico) {
        int idExamenMedico;
        idExamenMedico = examenMedicoRepository.registrarExamenMedico(examenMedico);
        return idExamenMedico;
    }

    public ExamenMedico buscarExamenMedico(String pv_filtro) {
        List<ExamenMedico> lexamenes;
        lexamenes = examenMedicoRepository.buscarExamenMedicoID(pv_filtro);
        if (!lexamenes.isEmpty()) {
            return lexamenes.get(0);
        } else {
            // Manejar el caso en que la lista está vacía, por ejemplo, lanzar una excepción o devolver un valor predeterminado.
            // Aquí un ejemplo de devolver null:
            return null;
        }
    }
}
