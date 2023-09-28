package com.minsa.sanama.controller.rrhh;

import com.minsa.sanama.model.rrhh.Administrativo;
import com.minsa.sanama.services.rrhh.AdministrativoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rrhh")
@CrossOrigin
public class AdministrativoController {
    @Autowired
    AdministrativoService administrativoService;

    @GetMapping(value = "/get/administrativo")
    @ResponseBody
    public List<Administrativo> listarAdminsitrativos(){
        List<Administrativo> administrativos;
        administrativos = administrativoService.listarAdminsitrativos();
        return administrativos;
    }

    @PutMapping(value = "/put/administrativo")
    @ResponseBody
    public int registrarAdministrativo(@RequestBody Administrativo administrativo){
        int idEnfermera;

        idEnfermera = administrativoService.registrarAdministrativo(administrativo);
        return idEnfermera;
    }

    @PatchMapping(value = "/patch/administrativo")
    @ResponseBody
    public int actualizarAdministrativo(@RequestBody Administrativo administrativo){
        int n;
        n = administrativoService.actualizarAdministrativo(administrativo);
        return n;
    }

    @PatchMapping(value = "/delete/administrativo")
    @ResponseBody
    public int eliminarAdministrativo(@RequestBody Administrativo administrativo){
        int n;
        n = administrativoService.eliminarAdministrativo(administrativo);
        return n;
    }

}
