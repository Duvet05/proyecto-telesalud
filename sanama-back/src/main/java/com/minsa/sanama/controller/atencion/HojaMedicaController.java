package com.minsa.sanama.controller.atencion;

import com.minsa.sanama.model.admision.ProgramacionCita;
import com.minsa.sanama.model.atencionmedica.HistorialClinico;
import com.minsa.sanama.model.atencionmedica.HojaMedica;
import com.minsa.sanama.services.atencion.HojaMedicaService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atencion")
@CrossOrigin
public class HojaMedicaController {
    @Autowired
    HojaMedicaService hojaMedicaService;

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/registrarHojaMedica")
    @ResponseBody
    public int registrarHojaMedica(@RequestBody HistorialClinico historialClinico) {
        try {
            HojaMedica hojaMedica = null;
            int n;
            hojaMedica = historialClinico.getHojasMedicas().get(0);
            n = hojaMedicaService.registrarHojaMedica(hojaMedica, historialClinico.getIdHistorialClinico());
            return n;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return -1;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/eliminarHojaMedica")
    @ResponseBody
    public int eliminarHojaMedica(@RequestBody String pv_datos) {
        int n = 0;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_hoja_medica = job.get("pn_id_hoja_medica").toString();
            n = hojaMedicaService.eliminarHojaMedica(pn_id_hoja_medica);
            return n;
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return -1;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/buscarTriajeCitaHojaMedica")
    @ResponseBody
    public ProgramacionCita buscarTriajeCitaHojaMedica(@RequestBody String pv_datos) {
        ProgramacionCita cita = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_cita = Integer.parseInt(job.get("pn_id_cita").toString());
            cita = hojaMedicaService.buscarTriajeCitaMedica(pn_id_cita);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return cita;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/registrarNuevaHojaMedica")
    @ResponseBody
    public int registrarNuevaHojaMedica(@RequestBody HojaMedica hojaMedica) {
        int idHojaMedica = 0;
        try {
            idHojaMedica = hojaMedicaService.registrarNuevaHojaMedica(hojaMedica);
            return idHojaMedica;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return -1;
    }

    // este servicio de abajo ni lo miren, ni lo toquen, ni lo usen
    // ya saben.... solo lo usé de prueba
    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/registrarRecetaMedicaPrueba")
    @ResponseBody
    public int registrarRecetaMedicaPrueba(@RequestBody String pv_datos) {
        int idReceta = 0;
        try {
            System.out.println("dentro del try");
            idReceta = hojaMedicaService.registrarRecetaMedicaPrueba();
            return idReceta;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return -1;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/mostrarCodigoHojaMedicaCita")
    @ResponseBody
    public HojaMedica mostrarCodigoHojaMedicaCita(@RequestBody String pv_datos) {
        HojaMedica hojaMedica = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_cita = Integer.parseInt(job.get("pn_id_cita").toString());
            hojaMedica = hojaMedicaService.mostrarCodigoHojaMedicaCita(pn_id_cita);
            return hojaMedica;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/ListarHojasMedicasFiltro")
    @ResponseBody
    public List<HojaMedica> listarHojasMedicasFiltro(@RequestBody String pv_datos) {
        List<HojaMedica> lhoja = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            System.out.println(pv_datos);

            String pn_id_paciente;
            String pn_id_especialidad;
            String pd_fecha_inicio;
            String pd_fecha_fin;

            if (job.get("pn_id_paciente") == null)
                pn_id_paciente = null;
            else
                pn_id_paciente = job.get("pn_id_paciente").toString();
            if (job.get("pn_id_especialidad") == null)
                pn_id_especialidad = null;
            else
                pn_id_especialidad = job.get("pn_id_especialidad").toString();
            if (job.get("pd_fecha_inicio") == null)
                pd_fecha_inicio = null;
            else
                pd_fecha_inicio = job.get("pd_fecha_inicio").toString();
            if (job.get("pd_fecha_fin") == null)
                pd_fecha_fin = null;
            else
                pd_fecha_fin = job.get("pd_fecha_fin").toString();

            lhoja = hojaMedicaService.listarHojasMedicasFiltro(pn_id_paciente, pn_id_especialidad, pd_fecha_inicio,
                    pd_fecha_fin);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return lhoja;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/buscarHojaMedicaPaciente")
    @ResponseBody
    public HojaMedica buscarHojaMedicaPaciente(@RequestBody String pv_datos) {
        HojaMedica hojaMedica;
        try {
            System.out.println("dentro del try");
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_hoja_medica = Integer.parseInt(job.get("pn_id_hoja_medica").toString());
            hojaMedica = hojaMedicaService.buscarHojaMedicaPaciente(pn_id_hoja_medica);
            return hojaMedica;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    // http://localhost:8080/atencion/post/buscarResultadosPaciente
    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/buscarResultadosPaciente")
    @ResponseBody
    public HojaMedica buscarResultadosPaciente(@RequestBody String pv_datos) {
        HojaMedica hojaMedica;
        try {
            System.out.println("dentro del try");
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_hoja_medica = Integer.parseInt(job.get("pn_id_hoja_medica").toString());
            hojaMedica = hojaMedicaService.buscarResultadosPaciente(pn_id_hoja_medica);
            return hojaMedica;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

}
