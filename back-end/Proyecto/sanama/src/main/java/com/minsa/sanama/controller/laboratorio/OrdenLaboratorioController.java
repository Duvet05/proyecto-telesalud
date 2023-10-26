package com.minsa.sanama.controller.laboratorio;

import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.services.laboratorio.OrdenLaboratorioService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atencion")
@CrossOrigin
public class OrdenLaboratorioController {
    @Autowired
    OrdenLaboratorioService ordenLaboratorioService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/listarOrdenLaboratorioFiltro")
    @ResponseBody
    public List<CitaMedica> listarOrdenLaboratorioxFiltro(@RequestBody String pv_datos){
        List<CitaMedica> Lcita = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            System.out.println(pv_datos);
            String pv_filtro = job.get("pv_filtro").toString();
            String pn_estado=null;
            String pd_fecha_inicio=null;
            String pd_fecha_fin=null;

            if(job.get("pn_estado") != null) pn_estado = job.get("pn_estado").toString();
            if(job.get("pd_fecha_inicio") != null) pd_fecha_inicio = job.get("pd_fecha_inicio").toString();
            if(job.get("pd_fecha_fin") != null) pd_fecha_fin = job.get("pd_fecha_fin").toString();

            Lcita = ordenLaboratorioService.listarOrdenLaboratorioxFiltro(pv_filtro,pn_estado,pd_fecha_inicio,pd_fecha_fin);

        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }

        return Lcita;
    }
}