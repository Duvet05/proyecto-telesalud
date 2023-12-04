package com.minsa.sanama.controller.laboratorio;

import com.minsa.sanama.services.laboratorio.ExamenMedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laboratorio")
@CrossOrigin
public class ExamenMedicoController {
    @Autowired
    ExamenMedicoService examenmedicoService;


}
