package com.minsa.sanama.controller.rrhh;

import com.minsa.sanama.model.rrhh.Medico;
import com.minsa.sanama.model.rrhh.TurnoAtencion;
import com.minsa.sanama.services.rrhh.MedicoService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/rrhh")
@CrossOrigin
public class MedicoController {
    @Autowired
    MedicoService medicoService;

    @GetMapping(value = "/get/medico")
    @ResponseBody
    public List<Medico> listarMedicos() {
        List<Medico> medicos;
        medicos = medicoService.listarMedicos();
        return medicos;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/listarMedicosPorEspecialidadNombreCmp")
    @ResponseBody
    public List<Medico> listarMedicosPorEspecialidad(@RequestBody String pv_filtro) {
        List<Medico> medicos = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            String pv_medico = job.get("pv_medico").toString();
            String pv_especialidad = job.get("pv_especialidad").toString();
            // Llama al servicio para listar médicos por especialidad usando pv_medico y
            // pv_especialidad
            medicos = medicoService.listarMedicosporEspecialidad(pv_medico, pv_especialidad);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
        }
        return medicos;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/horarios_por_medico_y_fecha")
    @ResponseBody
    public List<TurnoAtencion> listarHorariosDisponibles(@RequestBody String pv_datos) {
        List<TurnoAtencion> horarios = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_medico = job.get("pn_id_medico").toString();
            String pd_fecha = job.get("pd_fecha").toString();
            System.out.println(pv_datos);
            horarios = medicoService.listarHorariosDisponibles(pn_id_medico, pd_fecha);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return horarios;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/horarios_por_medico_e_intervaloFechas")
    @ResponseBody
    public List<TurnoAtencion> listarHorariosDisponiblesIntervalo(@RequestBody String pv_datos) {
        List<TurnoAtencion> horarios = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_medico = job.get("pn_id_medico").toString();
            String pd_fecha_inicio = job.get("pd_fecha_inicio").toString();
            String pd_fecha_fin = job.get("pd_fecha_fin").toString();
            System.out.println(pv_datos);
            horarios = medicoService.listarHorariosDisponiblesIntervalo(pn_id_medico, pd_fecha_inicio, pd_fecha_fin);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return horarios;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/dias_disponibles_por_medico")
    @ResponseBody
    public List<LocalDate> listarDiasDisponibles(@RequestBody String pv_datos) {
        List<LocalDate> dias = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pn_id_medico = job.get("pn_id_medico").toString();
            System.out.println(pv_datos);
            dias = medicoService.listarDiasDisponibles(pn_id_medico);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }

        return dias;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/buscarMedico")

    @ResponseBody
    public List<Medico> buscarMedicoFiltro(@RequestBody String pv_filtro) {
        List<Medico> medicos = null;
        try {
            System.out.println(pv_filtro);
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            String cadena = job.get("pv_filtro").toString();
            medicos = medicoService.buscarMedicoFiltro(cadena);

        } catch (Exception ex) {

        }
        return medicos;
    }

    @PostMapping(value = "/post/registrarMedico")
    @ResponseBody
    public int registrarMedicos(@RequestBody Medico medico) {
        try{
            int idMedico;
            idMedico = medicoService.registrarMedico(medico);
            return idMedico;
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return -1;
    }

    @PutMapping(value = "/put/actualizarMedicoShort")
    @ResponseBody
    public int actualizarMedicoShort(@RequestBody Medico medico) {
        try{
            int valido;
            valido = medicoService.actualizarMedicoShort(medico);
            return valido;
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return -1;
    }

    /* Cambios en el actualizar y en el eliminar Medico */
    @PutMapping(value = "/put/actualizarMedico")
    @ResponseBody
    public int actualizarMedico(@RequestBody Medico medico) {
        try{
            int n;
            n = medicoService.actualizarMedico(medico);
            return n;
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return -1;
    }

    @DeleteMapping(value = "/delete/eliminarMedico")
    @ResponseBody
    public int eliminarMedico(@RequestBody Medico medico) {
        try{
            int n;
            n = medicoService.eliminarMedico(medico);
            return n;
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return -1;
    }

}
