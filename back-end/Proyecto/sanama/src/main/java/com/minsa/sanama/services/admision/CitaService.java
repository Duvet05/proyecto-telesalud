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

    public List<CitaMedica> listarCitasxFiltro(String pn_id_especialidad, String pv_filtro, String pd_fecha_inicio, String pd_fecha_fin, String pn_estado) {
        List<CitaMedica> lCitas;
        lCitas = citaRepository.listarCitasxFiltro(pn_id_especialidad, pv_filtro, pd_fecha_inicio, pd_fecha_fin, pn_estado);
        return lCitas;
    }

    public List<CitaMedica> listarCitasxMedico(String pn_id_medico, String pn_estado) {
        List<CitaMedica> lCitas;
        lCitas = citaRepository.listarCitasxMedico(pn_id_medico, pn_estado);
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
        citaMedica.setTipoCita("MEDICA");
        citaMedica.setEstado(4);
        idCita = citaRepository.registrarCita(citaMedica);
        if (idCita != -1)
            return idCita;
        else
            return -1;
    }
}
