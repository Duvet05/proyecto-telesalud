package com.minsa.sanama.controller.laboratorio;

import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.services.laboratorio.OrdenLaboratorioService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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
            System.out.println(pv_datos);
            String pv_filtro = job.get("pv_filtro").toString();
            String pd_fecha_inicio=null;
            String pd_fecha_fin=null;

            if(job.get("pd_fecha_inicio") != null) pd_fecha_inicio = job.get("pd_fecha_inicio").toString();
            if(job.get("pd_fecha_fin") != null) pd_fecha_fin = job.get("pd_fecha_fin").toString();

            lordenes = ordenLaboratorioService.listarOrdenLaboratorioFiltro(pv_filtro,pd_fecha_inicio,pd_fecha_fin);

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
            System.out.println(pv_datos);
            String pn_id_orden_laboratorio = job.get("pn_id_orden_laboratorio").toString();
            orden = ordenLaboratorioService.buscarOrdenLaboratorio(pn_id_orden_laboratorio);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }

        return orden;
    }
}
