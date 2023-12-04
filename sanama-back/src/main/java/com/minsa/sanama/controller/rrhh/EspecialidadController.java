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
    public List<Especialidad> listarEspecialidades() {
        List<Especialidad> especialidades;

        especialidades = especialidadService.listarEspecialidades();
        return especialidades;
    }
/*
    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/especialidadNombre")

    @ResponseBody
    public List<Especialidad> listarEspecialidadesporNombre(@RequestBody String pv_filtro) {
        List<Especialidad> especialidades = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            String cadena = job.get("pv_filtro").toString();
            especialidades = especialidadService.listarEspecialidadesporNombre(cadena);
        } catch (Exception ex) {
        }
        return especialidades;
    }
 */
}
