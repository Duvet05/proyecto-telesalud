package com.minsa.sanama.controller.admision;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.services.admision.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admision")
@CrossOrigin
public class PacienteController {
    @Autowired
    PacienteService pacienteService;

    @GetMapping(value = "/get/paciente")
    @ResponseBody
    public List<Paciente> listarPacientes(){
        List<Paciente> pacientes;

        pacientes = pacienteService.listarPacientes();
        return pacientes;
    }

    @GetMapping(value = "/get/buscarPaciente")
    @ResponseBody
    public List<Paciente> buscarPacienteFiltro(@RequestParam String pv_filtro){
        List<Paciente> pacientes;

        pacientes = pacienteService.buscarPacienteFiltro(pv_filtro);
        return pacientes;
    }

    @PutMapping(value = "/put/paciente")
    @ResponseBody
    public int registrarPaciente(@RequestBody Paciente paciente){
        int idPaciente;

        idPaciente = pacienteService.registrarPaciente(paciente);
        return idPaciente;
    }

    @PatchMapping(value = "/patch/paciente")
    @ResponseBody
    public int actualizarPaciente(@RequestBody Paciente paciente){
        int n;
        n = pacienteService.actualizarPaciente(paciente);
        return n;
    }

    @PatchMapping(value = "/delete/paciente")
    @ResponseBody
    public int eliminarPaciente(@RequestBody Paciente paciente){
        int n;
        n = pacienteService.eliminarPaciente(paciente);
        return n;
    }
}
