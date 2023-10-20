package com.minsa.sanama.controller.admision;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.admision.ProgramacionCita;
import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.model.admision.Triaje;
import com.minsa.sanama.services.admision.PacienteService;
import com.minsa.sanama.services.admision.TriajeService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDate;
import java.time.LocalTime;
@RestController
@RequestMapping("/admision")
@CrossOrigin
public class TriajeController {
    @Autowired
    TriajeService triajeService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/listarTriajePorFiltro")
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
            value = "/post/buscarTriaje")
    @ResponseBody
    public List<CitaMedica> buscarTriaje(@RequestBody String pv_filtro){
        List<CitaMedica> programacionCitas = null;
        try{
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            String cadena = job.get("pv_filtro").toString();
            programacionCitas = triajeService.listarTriajePorFiltro(cadena);

        }catch(Exception ex){

        }
        return programacionCitas;
    }

    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/put/actualizarTriaje")
    @ResponseBody
    public int actualizarTriaje(@RequestBody String pv_filtro) {
        int updatedTriaje = 0;
        Triaje triaje=new Triaje();
        try {
            JSONObject json = (JSONObject) new JSONParser().parse(pv_filtro);
            int pn_id_triaje = Integer.parseInt(json.get("pn_id_triaje").toString());
            int pn_peso = Integer.parseInt(json.get("pn_peso").toString());
            int pn_talla = Integer.parseInt(json.get("pn_talla").toString());
            int pn_temperatura = Integer.parseInt(json.get("pn_temperatura").toString());
            String pv_motivo_visita = json.get("pv_motivo_visita").toString();
            int pn_presion_arterial = Integer.parseInt(json.get("pn_presion_arterial").toString());
            String pv_condicionesPrexistentes = json.get("pv_condicionesPrexistentes").toString();
            String pv_prioridad = json.get("pv_prioridad").toString();
            int pn_estado = Integer.parseInt(json.get("pn_estado").toString());
            String pn_saturacionOxigeno = json.get("pn_saturacionOxigeno").toString();
            String pn_frecuenciaCardiaca = json.get("pn_frecuenciaCardiaca").toString();
            String pv_nivelConciencia = json.get("pv_nivelConciencia").toString();
            String pv_nivelDolor = json.get("pv_nivelDolor").toString();
            triaje.setIdTriaje(pn_id_triaje);
            triaje.setPeso(pn_peso);
            triaje.setTalla(pn_talla);
            triaje.setTemperatura(pn_temperatura);
            triaje.setMotivoVisita(pv_motivo_visita);
            triaje.setPresionArterial(pn_presion_arterial);
            triaje.setCondicionesPrexistentes(pv_condicionesPrexistentes);
            triaje.setPrioridad(pv_prioridad);
            triaje.setEstado(pn_estado);
            triaje.setSaturacionOxigeno(pn_saturacionOxigeno);
            triaje.setFrecuenciaCardiaca(pn_frecuenciaCardiaca);
            triaje.setNivelConciencia(pv_nivelConciencia);
            triaje.setNivelDolor(pv_nivelDolor);
            updatedTriaje = triajeService.actualizarTriaje(triaje);
        } catch (Exception ex) {

        }
        return updatedTriaje;
    }
}
