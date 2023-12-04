package com.minsa.sanama.services.rrhh;

import com.minsa.sanama.model.rrhh.Enfermera;
import com.minsa.sanama.repository.rrhh.EnfermeraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnfermeraService {

    @Autowired
    EnfermeraRepository enfermeraRepository;
    public List<Enfermera> listarEnfermeras(){
        List<Enfermera> lEnfermeras;
        lEnfermeras = enfermeraRepository.listarEnfermeras();
        return lEnfermeras;
    }

    public int registrarEnfermera(Enfermera enfermera){
        int idEnfermera;
        idEnfermera = enfermeraRepository.registrarEnfermera(enfermera);
        return idEnfermera;
    }

    public int actualizarEnfermera(Enfermera enfermera){
        int n;
        n = enfermeraRepository.actualizarEnfermera(enfermera);
        return n;
    }
    public int eliminarEnfermera(Enfermera enfermera){
        int n;
        n = enfermeraRepository.eliminarEnfermera(enfermera);
        return n;
    }

}
