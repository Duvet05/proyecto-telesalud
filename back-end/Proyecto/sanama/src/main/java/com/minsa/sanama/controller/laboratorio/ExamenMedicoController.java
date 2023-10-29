package com.minsa.sanama.controller.laboratorio;

import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.model.laboratorio.ExamenMedico;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.services.laboratorio.ExamenMedicoService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laboratorio")
@CrossOrigin
public class ExamenMedicoController {
    @Autowired
    ExamenMedicoService examenmedicoService;
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},

            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/registrarExamenMedico")
    @ResponseBody
    public int registrarMedicos(@RequestBody ExamenMedico examenMedico) {
        int idExamenMedico=0;
        try{
            idExamenMedico = examenmedicoService.registrarExamenMedico(examenMedico);
        } catch(Exception ex){

        }
        return idExamenMedico;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/buscarExamenMedico")
    @ResponseBody
    public ExamenMedico buscarExamenMedico(@RequestBody String pv_datos){
        ExamenMedico examenMedico = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pv_filtro = job.get("pv_filtro").toString();
            examenMedico = examenmedicoService.buscarExamenMedico(pv_filtro);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }

        return examenMedico;
    }
}
