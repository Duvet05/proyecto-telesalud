package com.minsa.sanama.controller.rrhh;

import com.minsa.sanama.model.rrhh.Medico;
import com.minsa.sanama.services.rrhh.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rrhh")
@CrossOrigin
public class MedicoController {
    @Autowired
    MedicoService medicoService;

    @GetMapping(value = "/get/p")
    @ResponseBody
    public List<Medico> listarMedicos(){
        List<Medico> medicos;
        medicos = medicoService.listarMedicos();
        return medicos;
    }

    @PutMapping(value = "/put/medico")
    @ResponseBody
    public int registrarMedicos(@RequestBody Medico medico){
        int idMedico;

        idMedico = medicoService.registrarMedico(medico);
        return idMedico;
    }

    @PatchMapping(value = "/patch/medico")
    @ResponseBody
    public int actualizarPaciente(@RequestBody Medico medico){
        int n;
        n = medicoService.actualizarMedico(medico);
        return n;
    }

    @PatchMapping(value = "/delete/medico")
    @ResponseBody
    public int eliminarPaciente(@RequestBody Medico medico){
        int n;
        n = medicoService.eliminarMedico(medico);
        return n;
    }

}
