package com.minsa.sanama.services.atencionmedica;

import com.minsa.sanama.model.atencionmedica.HojaMedica;
import com.minsa.sanama.repository.atencionmedica.HojaMedicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HojaMedicaService {

    @Autowired
    HojaMedicaRepository hojaMedicaRepository;
    public int registrarHojaMedica(HojaMedica hojaMedica){
        int idHojaMedica;
        idHojaMedica = hojaMedicaRepository.registrarHojaMedica(hojaMedica);
        if(idHojaMedica!=-1){
            return idHojaMedica;
        }
        return -1;
    }
}