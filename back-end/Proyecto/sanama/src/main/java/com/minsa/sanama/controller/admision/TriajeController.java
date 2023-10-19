package com.minsa.sanama.controller.admision;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.admision.ProgramacionCita;
import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.services.admision.PacienteService;
import com.minsa.sanama.services.admision.TriajeService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admision")
@CrossOrigin
public class TriajeController {
    @Autowired
    TriajeService triajeService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/listarTriajeporFiltro")
    @ResponseBody
    public List<CitaMedica> listarTriajeporFiltro(@RequestBody String pv_filtro){
        List<CitaMedica> programacionCitas = null;
        try{
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            String cadena = job.get("pv_filtro").toString();
            programacionCitas = triajeService.listarTriajePorFiltro(cadena);

        }catch(Exception ex){

        }
        return programacionCitas;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/listarTriajeporID")
    @ResponseBody
    public List<CitaMedica> listarTriajeporID(@RequestBody String pv_filtro){
        List<CitaMedica> programacionCitas = null;
        try{
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            String cadena = job.get("pv_filtro").toString();
            programacionCitas = triajeService.listarTriajePorFiltro(cadena);

        }catch(Exception ex){

        }
        return programacionCitas;
    }
}
