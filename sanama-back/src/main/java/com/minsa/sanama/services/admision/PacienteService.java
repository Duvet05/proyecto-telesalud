package com.minsa.sanama.services.admision;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.atencionmedica.HistorialClinico;
import com.minsa.sanama.repository.admision.PacienteRepository;
import com.minsa.sanama.repository.atencionmedica.HistorialClinicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService {

    @Autowired
    PacienteRepository pacienteRepository;
    @Autowired
    HistorialClinicoRepository historiaRepository;
    public List<Paciente> listarPacientes(){
        List<Paciente> lPacientes;
        lPacientes = pacienteRepository.listarPacientes();
        return lPacientes;
    }
    public List<Paciente> buscarPacienteFiltro(String pv_filtro){
        List<Paciente> lPacientes;
        lPacientes = pacienteRepository.buscarPacienteFiltro(pv_filtro);
        return lPacientes;
    }

    public Paciente mostrarPacienteRegistrado(String pn_id_paciente){
        List<Paciente> lPacientes;
        lPacientes = pacienteRepository.buscarPacienteFiltro(pn_id_paciente);
        return lPacientes.get(0);
    }

    public List<Paciente> buscarPaciente(String pv_nombre_dni){
        List<Paciente> lPacientes;
        lPacientes = pacienteRepository.buscarPaciente(pv_nombre_dni);
        return lPacientes;
    }

    public int registrarPaciente(Paciente paciente){
        int idPaciente, idHistoria=1;
        paciente.setHistorialClinico(new HistorialClinico());

        idPaciente = pacienteRepository.registrarPaciente(paciente);
        return idPaciente;
    }

    public int actualizarPaciente(Paciente paciente){
        int n;
        n = pacienteRepository.actualizarPaciente(paciente);
        return n;
    }

    public int actualizarPacienteShort(Paciente paciente){
        int n;
        n = pacienteRepository.actualizarPacienteShort(paciente);
        return n;
    }

    public int eliminarPaciente(Paciente paciente){
        int n;
        n = pacienteRepository.eliminarPaciente(paciente);
        return n;
    }
}
