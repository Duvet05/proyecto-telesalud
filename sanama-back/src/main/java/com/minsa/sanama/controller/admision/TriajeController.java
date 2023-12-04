package com.minsa.sanama.controller.admision;

import com.minsa.sanama.model.admision.Triaje;
import com.minsa.sanama.services.admision.TriajeService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
    public List<Triaje> listarTriajeporFiltro(@RequestBody String pv_datos){
        List<Triaje> triajes = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pv_filtro = job.get("pv_filtro").toString();
            String pd_fecha_inicio;
            String pd_fecha_fin;
            String estado;

            boolean flag=true;
            List<String> estados = new ArrayList<>();

            if(job.get("pd_fecha_inicio") == null) pd_fecha_inicio=null;
            else pd_fecha_inicio = job.get("pd_fecha_inicio").toString();

            if(job.get("pd_fecha_fin") == null) pd_fecha_fin=null;
            else pd_fecha_fin = job.get("pd_fecha_fin").toString();

            JSONArray arregloEstados = (JSONArray) job.get("arregloEstados");
            if (arregloEstados != null){
                for (Object estadoObjetc : arregloEstados) {
                    JSONObject pn_estado = (JSONObject) estadoObjetc;
                    if(pn_estado.get("estado") == null) estado=null;
                    else estado = pn_estado.get("estado").toString();
                    flag=false;
                    estados.add(estado);
                }
            }
            if(flag)estados.add(null);

            // Llama al servicio para listar citas por filtros
            triajes = triajeService.listarTriajePorFiltro(pv_filtro,pd_fecha_inicio,pd_fecha_fin, estados);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return triajes;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/buscarTriaje")
    @ResponseBody
    public Triaje buscarTriaje(@RequestBody String pv_datos){
        Triaje triaje = null;
        try{
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_triaje = job.get("pv_filtro").toString();
            triaje = triajeService.buscarTriajeID(pn_id_triaje);

        }catch(Exception ex){
            ex.printStackTrace();
        }
        return triaje;
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

            String pv_presion_sistolica = json.get("pv_presion_sistolica").toString();
            String pv_presion_diastolica = json.get("pv_presion_diastolica").toString();
            String pv_condicionesPrexistentes = json.get("pv_condicionesPrexistentes").toString();
            String pv_prioridad = json.get("pv_prioridad").toString();
            int pn_estado = Integer.parseInt(json.get("pn_estado").toString());
            String pn_saturacionOxigeno = json.get("pn_saturacionOxigeno").toString();
            String pn_frecuenciaCardiaca = json.get("pn_frecuenciaCardiaca").toString();
            String pn_frecuenciaRespiratoria = json.get("pn_frecuenciaRespiratoria").toString();
            String pn_glasgow = json.get("pn_glasgow").toString();
            String pn_eyes_open = json.get("pn_eyes_open").toString();
            String pn_talking_correctly = json.get("pn_talking_correctly").toString();
            String pn_able_to_move_body = json.get("pn_able_to_move_body").toString();
            String pv_nivelConciencia = json.get("pv_nivelConciencia").toString();
            String pv_nivelDolor = json.get("pv_nivelDolor").toString();
            triaje.setIdTriaje(pn_id_triaje);
            triaje.setPeso(pn_peso);
            triaje.setTalla(pn_talla);
            triaje.setTemperatura(pn_temperatura);
            triaje.setMotivoVisita(pv_motivo_visita);
            triaje.setPresionSistolica(pv_presion_sistolica);
            triaje.setPresionDiastolica(pv_presion_diastolica);
            triaje.setCondicionesPrexistentes(pv_condicionesPrexistentes);
            triaje.setPrioridad(pv_prioridad);
            triaje.setEstado(pn_estado);
            triaje.setSaturacionOxigeno(pn_saturacionOxigeno);
            triaje.setFrecuenciaCardiaca(pn_frecuenciaCardiaca);
            triaje.setFrecuenciaRespiratoria(pn_frecuenciaRespiratoria);
            triaje.setGlasgow(pn_glasgow);
            triaje.setEyesOpen(pn_eyes_open);
            triaje.setTalkingCorrectly(pn_talking_correctly);
            triaje.setAbleToMoveBody(pn_able_to_move_body);
            triaje.setNivelConciencia(pv_nivelConciencia);
            triaje.setNivelDolor(pv_nivelDolor);
            updatedTriaje = triajeService.actualizarTriaje(triaje);
            return updatedTriaje;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return -1;
    }

    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/put/eliminarTriaje")
    @ResponseBody
    public int eliminarTriaje(@RequestBody String pv_filtro) {
        int updatedTriaje = 0;
        Triaje triaje=new Triaje();
        try {
            JSONObject json = (JSONObject) new JSONParser().parse(pv_filtro);
            int pn_id_triaje = Integer.parseInt(json.get("pn_id_triaje").toString());
            int pn_peso = Integer.parseInt(json.get("pn_peso").toString());
            int pn_talla = Integer.parseInt(json.get("pn_talla").toString());
            int pn_temperatura = Integer.parseInt(json.get("pn_temperatura").toString());
            String pv_motivo_visita = json.get("pv_motivo_visita").toString();
            String pv_presion_sistolica = json.get("pv_presion_sistolica").toString();
            String pv_presion_diastolica = json.get("pv_presion_diastolica").toString();
            String pv_condicionesPrexistentes = json.get("pv_condicionesPrexistentes").toString();
            String pv_prioridad = json.get("pv_prioridad").toString();
            int pn_estado = Integer.parseInt(json.get("pn_estado").toString());
            String pn_saturacionOxigeno = json.get("pn_saturacionOxigeno").toString();
            String pn_frecuenciaCardiaca = json.get("pn_frecuenciaCardiaca").toString();
            String pn_frecuenciaRespiratoria = json.get("pn_frecuenciaRespiratoria").toString();
            String pn_glasgow = json.get("pn_glasgow").toString();
            String pn_eyes_open = json.get("pn_eyes_open").toString();
            String pn_talking_correctly = json.get("pn_talking_correctly").toString();
            String pn_able_to_move_body = json.get("pn_able_to_move_body").toString();
            String pv_nivelConciencia = json.get("pv_nivelConciencia").toString();
            String pv_nivelDolor = json.get("pv_nivelDolor").toString();
            triaje.setIdTriaje(pn_id_triaje);
            triaje.setPeso(pn_peso);
            triaje.setTalla(pn_talla);
            triaje.setTemperatura(pn_temperatura);
            triaje.setMotivoVisita(pv_motivo_visita);
            triaje.setPresionSistolica(pv_presion_sistolica);
            triaje.setPresionDiastolica(pv_presion_diastolica);
            triaje.setCondicionesPrexistentes(pv_condicionesPrexistentes);
            triaje.setPrioridad(pv_prioridad);
            triaje.setEstado(pn_estado);
            triaje.setSaturacionOxigeno(pn_saturacionOxigeno);
            triaje.setFrecuenciaCardiaca(pn_frecuenciaCardiaca);
            triaje.setFrecuenciaRespiratoria(pn_frecuenciaRespiratoria);
            triaje.setGlasgow(pn_glasgow);
            triaje.setEyesOpen(pn_eyes_open);
            triaje.setTalkingCorrectly(pn_talking_correctly);
            triaje.setAbleToMoveBody(pn_able_to_move_body);
            triaje.setNivelConciencia(pv_nivelConciencia);
            triaje.setNivelDolor(pv_nivelDolor);
            updatedTriaje = triajeService.eliminarTriaje(triaje);
            return updatedTriaje;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return -1;
    }
}
