package com.minsa.sanama.services.laboratorio;

import com.minsa.sanama.repository.laboratorio.ExamenMedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamenMedicoService {

    @Autowired
    ExamenMedicoRepository examenMedicoRepository;



}
