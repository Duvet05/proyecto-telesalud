package com.minsa.sanama.services.admision;

import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.repository.admision.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
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

    public List<CitaMedica> listarCitasUltimas() {
        List<CitaMedica> lCitas;
        lCitas = citaRepository.listarCitasUltimas();
        return lCitas;
    }

    public CitaMedica buscarCitaMedica(int pn_id_cita) {
        List<CitaMedica> lCitas;
        lCitas = citaRepository.buscarCitaMedica(pn_id_cita);
        if(!lCitas.isEmpty()){
            return lCitas.get(0);
        }
        return null;
    }

    public List<CitaMedica> listarCitasxFiltro(String pn_id_especialidad, String pv_filtro, String pd_fecha_inicio, String pd_fecha_fin, List<String> estados) {
        List<CitaMedica> lCitas;
        lCitas = citaRepository.listarCitasxFiltro(pn_id_especialidad, pv_filtro, pd_fecha_inicio, pd_fecha_fin, estados);
        return lCitas;
    }

    public List<CitaMedica> listarCitasDeMedicoxFiltro(String pn_id_medico, String pv_filtro, String pd_fecha_inicio, String pd_fecha_fin, List<String> estados) {
        List<CitaMedica> lCitas;
        lCitas = citaRepository.listarCitasDeMedicoxFiltro(pn_id_medico, pv_filtro, pd_fecha_inicio, pd_fecha_fin, estados);
        return lCitas;
    }

    public List<CitaMedica> listarCitasxMedico(String pn_id_medico, String pv_filtro, String pd_fecha_inicio, String pd_fecha_fin, List<String> estados) {
        List<CitaMedica> lCitas;
        lCitas = citaRepository.listarCitasxMedico(pn_id_medico,pv_filtro,pd_fecha_inicio,pd_fecha_fin, estados);
        return lCitas;
    }

    public int registrarCitaMedicaPaciente(CitaMedica citaMedica) {
        int idCita;

        idCita = citaRepository.registrarCita(citaMedica);
        if (idCita != -1)
            return idCita;
        else
            return -1;
    }

    public int cambiarEstadoCita(int pn_id_cita, int pn_estado) {
        int validar=-1;
        validar = citaRepository.cambiarEstadoCita(pn_id_cita, pn_estado);
        return validar;
    }

    public int cambiarHorarioCita(int pn_id_cita, LocalTime pt_hora_cita, LocalDate pd_fecha_cita) {
        int validar=-1;
        validar = citaRepository.cambiarHorarioCita(pn_id_cita, pt_hora_cita, pd_fecha_cita);
        return validar;
    }
}
