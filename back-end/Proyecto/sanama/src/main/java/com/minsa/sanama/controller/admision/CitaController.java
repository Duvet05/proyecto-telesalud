package com.minsa.sanama.controller.admision;

import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.services.admision.CitaService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admision")
@CrossOrigin
public class CitaController {
    @Autowired
    CitaService citaService;

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/listarCitasPorPaciente")
    @ResponseBody
    public List<CitaMedica> listarCitasPorPaciente(@RequestBody String pv_filtro) {
        List<CitaMedica> Lcita = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            int pn_paciente = Integer.parseInt(job.get("pn_paciente").toString());

            // Llama al servicio para listar citas por filtros
            Lcita = citaService.listarCitasxPaciente(pn_paciente);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
        }
        return Lcita;
    }

    @GetMapping(value = "/get/cita")
    @ResponseBody
    public List<CitaMedica> listarCitasTodas() {
        List<CitaMedica> citas;
        citas = citaService.listarCitasTodas();
        return citas;
    }

    @PostMapping(value = "/post/registrarCitaMedica")
    @ResponseBody
    public int registrarCitaMedicaPaciente(@RequestBody CitaMedica citaMedica) {
        try {
            int idCitaMedica=0;
            idCitaMedica = citaService.registrarCitaMedicaPaciente(citaMedica);
            return idCitaMedica;
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return -1;
    }
}
