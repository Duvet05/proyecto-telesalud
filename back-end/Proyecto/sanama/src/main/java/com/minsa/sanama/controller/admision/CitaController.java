package com.minsa.sanama.controller.admision;

import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.services.admision.CitaService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admision")
@CrossOrigin
public class CitaController {
    @Autowired
    CitaService citaService;

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/listarCitasPorPaciente")
    @ResponseBody
    public List<CitaMedica> listarCitasPorPaciente(@RequestBody String pv_filtro) {
        List<CitaMedica> Lcita = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            int pn_paciente = Integer.parseInt(job.get("pn_paciente").toString());

            // Llama al servicio para listar citas por filtros
            Lcita = citaService.listarCitasxPaciente(pn_paciente);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
        }
        return Lcita;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/listarCitasPorFiltro")
    @ResponseBody
    public List<CitaMedica> listarCitasPorFiltro(@RequestBody String pv_datos) {
        List<CitaMedica> Lcita = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            System.out.println(pv_datos);
            String pn_id_especialidad;
            String pv_filtro = job.get("pv_filtro").toString();
            String pd_fecha_inicio;
            String pd_fecha_fin;
            String pn_estado;

            if(job.get("pn_id_especialidad") == null) pn_id_especialidad=null;
            else pn_id_especialidad = job.get("pn_id_especialidad").toString();

            if(job.get("pd_fecha_inicio") == null) pd_fecha_inicio=null;
            else pd_fecha_inicio = job.get("pd_fecha_inicio").toString();

            if(job.get("pd_fecha_fin") == null) pd_fecha_fin=null;
            else pd_fecha_fin = job.get("pd_fecha_fin").toString();

            if(job.get("pn_estado") == null) pn_estado=null;
            else pn_estado = job.get("pn_estado").toString();

            // Llama al servicio para listar citas por filtros
            Lcita = citaService.listarCitasxFiltro(pn_id_especialidad, pv_filtro, pd_fecha_inicio, pd_fecha_fin, pn_estado);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return Lcita;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/listarCitasPorMedico")
    @ResponseBody
    public List<CitaMedica> listarCitasxMedico(@RequestBody String pv_datos) {
        List<CitaMedica> Lcita = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            System.out.println(pv_datos);
            String pn_id_medico= job.get("pn_id_medico").toString();
            String pn_estado;

            if(job.get("pn_estado") == null) pn_estado=null;
            else pn_estado = job.get("pn_estado").toString();

            // Llama al servicio para listar citas por filtros
            Lcita = citaService.listarCitasxMedico(pn_id_medico, pn_estado);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return Lcita;
    }

    @GetMapping(value = "/get/cita")
    @ResponseBody
    public List<CitaMedica> listarCitasTodas() {
        List<CitaMedica> citas;
        citas = citaService.listarCitasTodas();
        return citas;
    }

    @PostMapping(value = "/post/registrarCitaMedica")
    @ResponseBody
    public int registrarCitaMedicaPaciente(@RequestBody CitaMedica citaMedica) {
        try {
            int idCitaMedica=0;
            idCitaMedica = citaService.registrarCitaMedicaPaciente(citaMedica);
            return idCitaMedica;
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return -1;
    }
}
