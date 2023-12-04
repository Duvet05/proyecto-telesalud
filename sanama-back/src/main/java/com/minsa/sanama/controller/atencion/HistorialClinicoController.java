package com.minsa.sanama.controller.atencion;

import com.minsa.sanama.model.atencionmedica.HistorialClinico;
import com.minsa.sanama.services.atencion.HistorialClinicoService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/atencion")
@CrossOrigin
public class HistorialClinicoController {
    @Autowired
    HistorialClinicoService historialClinicoService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/buscarHistorialClinico")
    @ResponseBody
    public HistorialClinico buscarHistorialClinico(@RequestBody String pv_datos){
        HistorialClinico historialClinico = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_paciente = job.get("pn_id_paciente").toString();
            historialClinico = historialClinicoService.buscarHistorialClinico(pn_id_paciente);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }

        return historialClinico;
    }

}
