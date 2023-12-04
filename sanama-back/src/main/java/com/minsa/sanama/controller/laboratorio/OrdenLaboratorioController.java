package com.minsa.sanama.controller.laboratorio;

import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.services.laboratorio.OrdenLaboratorioService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/laboratorio")
@CrossOrigin
public class OrdenLaboratorioController {
    @Autowired
    OrdenLaboratorioService ordenLaboratorioService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/listarOrdenLaboratorioFiltro")
    @ResponseBody
    public List<OrdenLaboratorio> listarOrdenLaboratorioFiltro(@RequestBody String pv_datos){
        List<OrdenLaboratorio> lordenes = null;
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
            lordenes = ordenLaboratorioService.listarOrdenLaboratorioFiltro(pv_filtro,pd_fecha_inicio,pd_fecha_fin,estados);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return lordenes;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/buscarOrdenLaboratorio")
    @ResponseBody
    public OrdenLaboratorio buscarOrdenLaboratorio(@RequestBody String pv_datos){
        OrdenLaboratorio orden = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_orden_laboratorio = job.get("pn_id_orden_laboratorio").toString();
            orden = ordenLaboratorioService.buscarOrdenLaboratorio(pn_id_orden_laboratorio);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }

        return orden;
    }
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/atenderOrdenLaboratorioV1")
    @ResponseBody
    public int atenderOrdenLaboratorioV1(@RequestBody OrdenLaboratorio orden){
        try{
            int n;
            n = ordenLaboratorioService.atenderOrdenLaboratorioV1(orden);
            return n;
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return -1;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/registrarOrdenLaboratorio")
    @ResponseBody
    public int registrarOrdenLaboratorio(@RequestBody OrdenLaboratorio orden){
        try{
            int n;
            n = ordenLaboratorioService.registrarOrdenLaboratorio(orden);
            return n;
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return -1;
    }
/*
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/actualizarOrdenLaboratorio")
    @ResponseBody
    public int actualizarOrdenLaboratorio(@RequestBody OrdenLaboratorio orden){
        try{
            int n;
            n = ordenLaboratorioService.actualizarOrdenLaboratorio(orden);
            return n;
        }catch(Exception ex){
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return -1;
    }
*/
}
