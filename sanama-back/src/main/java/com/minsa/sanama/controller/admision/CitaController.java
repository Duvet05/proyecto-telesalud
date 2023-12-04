package com.minsa.sanama.controller.admision;

import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.services.admision.CitaService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
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
            String pn_id_especialidad;
            String pv_filtro = job.get("pv_filtro").toString();
            String pd_fecha_inicio;
            String pd_fecha_fin;
            String estado;
            boolean flag=true;
            List<String> estados = new ArrayList<>();

            if(job.get("pn_id_especialidad") == null) pn_id_especialidad=null;
            else pn_id_especialidad = job.get("pn_id_especialidad").toString();

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
            Lcita = citaService.listarCitasxFiltro(pn_id_especialidad, pv_filtro, pd_fecha_inicio, pd_fecha_fin, estados);
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
            String pv_filtro = job.get("pv_filtro").toString();
            String pn_id_medico = job.get("pn_id_medico").toString();
            String pd_fecha_inicio;
            String pd_fecha_fin;
            String estado;


            if(job.get("pd_fecha_inicio") == null) pd_fecha_inicio=null;
            else pd_fecha_inicio = job.get("pd_fecha_inicio").toString();

            if(job.get("pd_fecha_fin") == null) pd_fecha_fin=null;
            else pd_fecha_fin = job.get("pd_fecha_fin").toString();

            boolean flag=true;
            List<String> estados = new ArrayList<>();
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
            Lcita = citaService.listarCitasxMedico(pn_id_medico,pv_filtro,pd_fecha_inicio,pd_fecha_fin, estados);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return Lcita;
    }
    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/buscarCitaMedica")
    @ResponseBody
    public CitaMedica buscarCitaMedica(@RequestBody String pv_datos) {
        CitaMedica citaMedica = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_cita= job.get("pn_id_cita").toString();
            // Llama al servicio para buscar la Cita Medica por ID
            citaMedica = citaService.buscarCitaMedica(Integer.parseInt(pn_id_cita));
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return citaMedica;
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
            System.out.println("Fecha: " + citaMedica.getFechaCita());
            System.out.println("Hora: "+ citaMedica.getHoraCita());

            idCitaMedica = citaService.registrarCitaMedicaPaciente(citaMedica);
            return idCitaMedica;
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return -1;
    }

    @PostMapping(value = "/post/cambiarEstadoCita")
    @ResponseBody
    public int cambiarEstadoCita(@RequestBody String pv_datos) {
        int validar=-1;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_cita= Integer.parseInt(job.get("pn_id_cita").toString());
            int pn_estado= Integer.parseInt(job.get("pn_estado").toString());

            validar = citaService.cambiarEstadoCita(pn_id_cita, pn_estado);
            return validar;
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return -1;
    }

    @PostMapping(value = "/post/cambiarHorarioCita")
    @ResponseBody
    public int cambiarHorarioCita(@RequestBody String pv_datos) {
        int validar=-1;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_cita= Integer.parseInt(job.get("pn_id_cita").toString());
            LocalTime pt_hora_cita= LocalTime.parse(job.get("pt_hora_cita").toString());
            LocalDate pd_fecha_cita= LocalDate.parse(job.get("pd_fecha_cita").toString());

            validar = citaService.cambiarHorarioCita(pn_id_cita, pt_hora_cita, pd_fecha_cita);
            return validar;
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return -1;
    }

    @GetMapping(value = "/get/citaUltimas")
    @ResponseBody
    public List<CitaMedica> listarCitasUltimas() {
        List<CitaMedica> citas;
        citas = citaService.listarCitasUltimas();
        return citas;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/listarCitasDeMedicoPorFiltro")
    @ResponseBody
    public List<CitaMedica> listarCitasDeMedicoPorFiltro(@RequestBody String pv_datos) {
        List<CitaMedica> Lcita = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pv_filtro = job.get("pv_filtro").toString();
            String pn_id_medico = job.get("pn_id_medico").toString();
            String pd_fecha_inicio;
            String pd_fecha_fin;
            String estado;
            //String pn_estado;

            if(job.get("pd_fecha_inicio") == null) pd_fecha_inicio=null;
            else pd_fecha_inicio = job.get("pd_fecha_inicio").toString();

            if(job.get("pd_fecha_fin") == null) pd_fecha_fin=null;
            else pd_fecha_fin = job.get("pd_fecha_fin").toString();

            boolean flag=true;
            List<String> estados = new ArrayList<>();
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
            Lcita = citaService.listarCitasDeMedicoxFiltro(pn_id_medico, pv_filtro, pd_fecha_inicio, pd_fecha_fin, estados);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return Lcita;
    }

}
