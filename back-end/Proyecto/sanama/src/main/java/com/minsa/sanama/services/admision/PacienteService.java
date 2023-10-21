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

    public List<Paciente> buscarPacienteFiltroPrueba(String pv_filtro){
        List<Paciente> lPacientes;
        lPacientes = pacienteRepository.buscarPacienteFiltroPrueba(pv_filtro);
        return lPacientes;
    }

    public List<Paciente> ObtenerDatosPaciente(String pv_filtro){
        List<Paciente> lPacientes;
        lPacientes = pacienteRepository.ObtenerDatosPaciente(pv_filtro);
        return lPacientes;
    }

    public int registrarPaciente(Paciente paciente){
        int idPaciente, idHistoria;
        paciente.setHistorialClinico(new HistorialClinico());
        paciente.getHistorialClinico().setCodigo("HCN-"+paciente.getDni());
        idPaciente = pacienteRepository.registrarPaciente(paciente);
        idHistoria = historiaRepository.registrarHistorialClinico(paciente);
        if(idPaciente!=-1 && idHistoria!=-1){
            return idPaciente;
        }
        return -1;
    }

    public int actualizarPaciente(Paciente paciente){
        int n;
        n = pacienteRepository.actualizarPaciente(paciente);
        return n;
    }
    public int eliminarPaciente(Paciente paciente){
        int n;
        n = pacienteRepository.eliminarPaciente(paciente);
        return n;
    }
}
