package com.minsa.sanama.services.atencion;

import com.minsa.sanama.model.atencionmedica.EvaluacionMedica;
import com.minsa.sanama.repository.atencionmedica.EvaluacionMedicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EvaluacionMedicaService {
    @Autowired
    EvaluacionMedicaRepository evaluacionMedicaRepository;

    public int registrarEvaluacionMedica(EvaluacionMedica evaluacionMedica) {
        int valido;
        valido = evaluacionMedicaRepository.registrarEvaluacionMedica(evaluacionMedica);

        return valido;
    }

    public int actualizarEvaluacionMedica(EvaluacionMedica evaluacionMedica) {
        int valido;
        valido = evaluacionMedicaRepository.actualizarEvaluacionMedica(evaluacionMedica);
        return valido;
    }

}
