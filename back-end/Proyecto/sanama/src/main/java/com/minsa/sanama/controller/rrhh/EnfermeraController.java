package com.minsa.sanama.controller.rrhh;

import com.minsa.sanama.model.rrhh.Enfermera;
import com.minsa.sanama.services.rrhh.EnfermeraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rrhh")
@CrossOrigin
public class EnfermeraController {
    @Autowired
    EnfermeraService enfermeraService;

    @GetMapping(value = "/get/enfermera")
    @ResponseBody
    public List<Enfermera> listarEnfermeras(){
        List<Enfermera> enfermeras;
        enfermeras = enfermeraService.listarEnfermeras();
        return enfermeras;
    }

    @PutMapping(value = "/put/enfermera")
    @ResponseBody
    public int registrarEnfermera(@RequestBody Enfermera enfermera){
        int idEnfermera;

        idEnfermera = enfermeraService.registrarEnfermera(enfermera);
        return idEnfermera;
    }

    @PatchMapping(value = "/patch/enfermera")
    @ResponseBody
    public int actualizarEnfermera(@RequestBody Enfermera enfermera){
        int n;
        n = enfermeraService.actualizarEnfermera(enfermera);
        return n;
    }

    @PatchMapping(value = "/delete/enfermera")
    @ResponseBody
    public int eliminarEnfermera(@RequestBody Enfermera enfermera){
        int n;
        n = enfermeraService.eliminarEnfermera(enfermera);
        return n;
    }

}
