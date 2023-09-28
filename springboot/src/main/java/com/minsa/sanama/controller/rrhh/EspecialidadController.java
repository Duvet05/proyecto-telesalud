package com.minsa.sanama.controller.rrhh;

import com.minsa.sanama.model.rrhh.Especialidad;
import com.minsa.sanama.services.rrhh.EspecialidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rrhh")
@CrossOrigin
public class EspecialidadController {

    @Autowired
    EspecialidadService especialidadService;

    @GetMapping(value = "/get/especialidad")
    @ResponseBody
    public List<Especialidad> listarEspecialidades(){
        List<Especialidad> especialidades;

        especialidades = especialidadService.listarEspecialidades();
        return especialidades;
    }
}
