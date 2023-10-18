package com.minsa.sanama.services.rrhh;

import com.minsa.sanama.model.rrhh.Medico;
import com.minsa.sanama.model.rrhh.TurnoAtencion;
import com.minsa.sanama.repository.rrhh.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class MedicoService {

    @Autowired
    MedicoRepository medicoRepository;

    public List<Medico> listarMedicos() {
        List<Medico> lMedicos;
        lMedicos = medicoRepository.listarMedicos();
        return lMedicos;
    }

    public List<Medico> listarMedicosporEspecialidad(String pv_medico, String pv_especialidad) {
        List<Medico> lMedicos;
        lMedicos = medicoRepository.listarMedicosporEspecialidad(pv_medico, pv_especialidad);
        return lMedicos;
    }

    public List<TurnoAtencion> listarHorariosDisponibles(String pn_id_medico, String pd_fecha) {
        List<TurnoAtencion> lTurnos = null;
        lTurnos = medicoRepository.listarHorariosDisponibles(pn_id_medico, pd_fecha);
        return lTurnos;
    }

    public List<LocalDate> listarDiasDisponibles(String pn_id_medico) {
        List<LocalDate> lDates = null;
        lDates = medicoRepository.listarDiasDisponibles(pn_id_medico);
        return lDates;
    }

    public List<Medico> buscarMedicoFiltro(String pv_filtro) {
        List<Medico> lMedicos;
        lMedicos = medicoRepository.buscarMedicoFiltro(pv_filtro);
        return lMedicos;
    }

    public int registrarMedico(Medico medico) {
        int idMedico;
        idMedico = medicoRepository.registrarMedico(medico);
        return idMedico;
    }

    public int actualizarMedico(Medico medico) {
        int n;
        n = medicoRepository.actualizarMedico(medico);
        return n;
    }

    public int eliminarMedico(Medico medico) {
        int n;
        n = medicoRepository.eliminarMedico(medico);
        return n;
    }

}
