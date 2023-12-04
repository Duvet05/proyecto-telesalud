package com.minsa.sanama.services.rrhh;

import com.minsa.sanama.model.rrhh.Especialidad;
import com.minsa.sanama.repository.rrhh.EspecialidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecialidadService {

    @Autowired
    EspecialidadRepository especialidadRepository;
    public List<Especialidad> listarEspecialidades(){
        List<Especialidad> lEspecialidades;
        lEspecialidades = especialidadRepository.listarEspecialidades();
        return lEspecialidades;
    }

/*
    public List<Especialidad> listarEspecialidadesporNombre(String pv_filtro){
        List<Especialidad> lEspecialidades;
        lEspecialidades = especialidadRepository.listarEspecialidadesporNombre(pv_filtro);
        return lEspecialidades;
    }
*/
}
