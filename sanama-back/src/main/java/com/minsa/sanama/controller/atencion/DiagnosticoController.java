package com.minsa.sanama.controller.atencion;

import com.minsa.sanama.model.atencionmedica.Diagnostico;
import com.minsa.sanama.services.atencion.DiagnosticoService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atencion")
@CrossOrigin
public class DiagnosticoController {
    @Autowired
    DiagnosticoService diagnosticoService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/listarDiagnosticosFiltro")
    @ResponseBody
    public List<Diagnostico> listarDiagnosticos(@RequestBody String pv_datos) {
        List<Diagnostico> ldiagnosticos=null;
        try{
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pv_diagnostico = job.get("pv_diagnostico").toString();
            ldiagnosticos = diagnosticoService.listarDiagnosticos(pv_diagnostico);
        }catch (Exception ex){
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return ldiagnosticos;
    }
}
