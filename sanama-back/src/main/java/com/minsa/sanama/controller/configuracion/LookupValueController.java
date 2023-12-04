package com.minsa.sanama.controller.configuracion;

import com.minsa.sanama.model.atencionmedica.HojaMedica;
import com.minsa.sanama.model.configuracion.LookupValue;
import com.minsa.sanama.services.configuracion.LookupValueService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/configuracion")
@CrossOrigin
public class LookupValueController {
    @Autowired
    LookupValueService valueService;

    @GetMapping(value = "/get/listarParentezcos")
    @ResponseBody
    public List<LookupValue> listarParentezcos() {
        List<LookupValue> lvalores;
        lvalores = valueService.listarParentezcos();
        return lvalores;
    }

    @GetMapping(value = "/get/listarSeguros")
    @ResponseBody
    public List<LookupValue> listarSeguros() {
        List<LookupValue> lvalores;
        lvalores = valueService.listarSeguros();
        return lvalores;
    }

    @GetMapping(value = "/get/listarMedicosLab")
    @ResponseBody
    public List<LookupValue> listarMedicosLab() {
        List<LookupValue> lmedicos;
        lmedicos = valueService.listarMedicosLab();
        return lmedicos;
    }

    @GetMapping(value = "/get/listarEstadosCitas")
    @ResponseBody
    public List<LookupValue> listarEstadosCitas() {
        List<LookupValue> lcitas;
        lcitas = valueService.listarEstadosCitas();
        return lcitas;
    }
    @GetMapping(value = "/get/listarEstadosOrdenesLaboratorio")
    @ResponseBody
    public List<LookupValue> listarEstadosOrdenesLaboratorio() {
        List<LookupValue> lcitas;
        lcitas = valueService.listarEstadosCitasOrdenes();
        return lcitas;
    }

    @GetMapping(value = "/get/listarEstadosTriajes")
    @ResponseBody
    public List<LookupValue> listarEstadosTriajes() {
        List<LookupValue> lcitas;
        lcitas = valueService.listarEstadosCitasOrdenes();
        return lcitas;
    }

    @PostMapping(value = "/post/getStatusCita")
    @ResponseBody
    public LookupValue getStatusCita(@RequestBody String pv_datos){
        LookupValue cita=null;
        try{
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_cita = Integer.parseInt(job.get("pn_id_cita").toString());
            cita = valueService.getStatusCita(pn_id_cita);
            return cita;
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return null;
    }
}
