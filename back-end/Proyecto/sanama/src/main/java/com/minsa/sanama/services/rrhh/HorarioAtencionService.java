package com.minsa.sanama.services.rrhh;

import com.minsa.sanama.repository.rrhh.HorarioAtencionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class HorarioAtencionService {
    @Autowired
    HorarioAtencionRepository horarioAtencionRepository;

    public int registrarHorarioMedico(int idMedico, LocalTime horaInicio, LocalTime horaFin, LocalDate fecha) {
        int nTurnos;
        nTurnos = horarioAtencionRepository.registrarHorarioMedico(idMedico, horaInicio, horaFin, fecha);
        return nTurnos;
    }
}
