package com.minsa.sanama.services.rrhh;

import com.minsa.sanama.model.rrhh.TurnoAtencion;
import com.minsa.sanama.repository.rrhh.HorarioAtencionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HorarioAtencionService {
    @Autowired
    HorarioAtencionRepository horarioAtencionRepository;

    public int registrarHorarioMedico(int idMedico, String pd_fecha_inicio, String pd_fecha_fin, List<TurnoAtencion> turnos) {
        int nTurnos;
        nTurnos = horarioAtencionRepository.registrarHorarioMedico(idMedico, pd_fecha_inicio, pd_fecha_fin, turnos);
        return nTurnos;
    }
}
