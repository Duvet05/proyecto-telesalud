package com.minsa.sanama.services.rrhh;

import com.minsa.sanama.model.rrhh.Medico;
import com.minsa.sanama.repository.rrhh.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoService {

    @Autowired
    MedicoRepository medicoRepository;
    public List<Medico> listarMedicos(){
        List<Medico> lMedicos;
        lMedicos = medicoRepository.listarMedicos();
        return lMedicos;
    }

    public int registrarMedico(Medico medico){
        int idMedico;
        idMedico = medicoRepository.registrarMedico(medico);
        return idMedico;
    }

    public int actualizarMedico(Medico medico){
        int n;
        n = medicoRepository.actualizarMedico(medico);
        return n;
    }
    public int eliminarMedico(Medico medico){
        int n;
        n = medicoRepository.eliminarMedico(medico);
        return n;
    }

}
