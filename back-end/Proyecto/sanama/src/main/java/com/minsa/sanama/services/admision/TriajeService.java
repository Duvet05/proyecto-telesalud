package com.minsa.sanama.services.admision;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.admision.Triaje;
import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.repository.admision.TriajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TriajeService {

    @Autowired
    TriajeRepository triajeRepository;

    public List<CitaMedica> listarTriajePorFiltro(String pv_filtro) {
        List<CitaMedica> lCitas;
        lCitas = triajeRepository.listarTriajePorFiltro(pv_filtro);
        return lCitas;
    }

    public int actualizarTriaje(Triaje triaje) {
        return triajeRepository.actualizarTriaje(triaje);
    }

}