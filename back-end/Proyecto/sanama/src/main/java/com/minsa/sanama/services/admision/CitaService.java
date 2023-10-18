package com.minsa.sanama.services.admision;

import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.repository.admision.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CitaService {

    @Autowired
    CitaRepository citaRepository;

    public List<CitaMedica> listarCitasTodas() {
        List<CitaMedica> lCitas;
        lCitas = citaRepository.listarCitasTodas();
        return lCitas;
    }

    public List<CitaMedica> listarCitasxPaciente(int pv_idPaciente) {
        List<CitaMedica> lCitas;
        lCitas = citaRepository.listarCitasxPaciente(pv_idPaciente);
        return lCitas;
    }

    public int registrarCitaMedicaPaciente(CitaMedica citaMedica) {
        int idCita = 0;
        int dd, mm, aa, hora, min, seg;
        int idMedico = citaMedica.getMedico().getIdPersona();
        aa = citaMedica.getFechaCita().getYear();
        mm = citaMedica.getFechaCita().getMonthValue();
        dd = citaMedica.getFechaCita().getDayOfMonth();
        hora = citaMedica.getHoraCita().getHour();
        min = citaMedica.getHoraCita().getMinute();
        seg = citaMedica.getHoraCita().getSecond();
        citaMedica.setCodigoCitaMedica("CM-" + aa + mm + dd + "-" +
                hora + min + seg + "-" + idMedico);

        idCita = citaRepository.registrarCita(citaMedica);
        if (idCita != -1)
            return idCita;
        else
            return -1;
    }
}
