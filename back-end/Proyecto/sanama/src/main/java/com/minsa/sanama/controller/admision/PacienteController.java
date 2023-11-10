package com.minsa.sanama.controller.admision;
import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.rrhh.TurnoAtencion;
import com.minsa.sanama.services.admision.PacienteService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admision")
@CrossOrigin
public class PacienteController {
    @Autowired
    PacienteService pacienteService;

    @GetMapping(value = "/get/paciente")
    @ResponseBody
    public List<Paciente> listarPacientes(){
        List<Paciente> pacientes;

        pacientes = pacienteService.listarPacientes();
        return pacientes;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/buscarPaciente")

    @ResponseBody
    public List<Paciente> buscarPacienteFiltro(@RequestBody String pv_filtro){
        List<Paciente> pacientes = null;
        try{
            System.out.println(pv_filtro);
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            String cadena = job.get("pv_filtro").toString();
            System.out.println(cadena);
            pacientes = pacienteService.buscarPacienteFiltro(cadena);

        }catch(Exception ex){

        }
        return pacientes;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/buscarPacientePrueba")

    @ResponseBody
    public List<Paciente> buscarPacienteFiltroPrueba(@RequestBody String pv_filtro){
        List<Paciente> pacientes = null;
        try{
            System.out.println(pv_filtro);
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            String cadena = job.get("pv_filtro").toString();
            System.out.println(cadena);
            pacientes = pacienteService.buscarPacienteFiltroPrueba(cadena);

        }catch(Exception ex){

        }
        return pacientes;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/obtenerPaciente")

    @ResponseBody
    public List<Paciente> ObtenerDatosPaciente(@RequestBody String pv_filtro){
        List<Paciente> pacientes = null;
        try{
            JSONObject job = (JSONObject) new JSONParser().parse(pv_filtro);
            String cadena = job.get("pv_filtro").toString();
            pacientes = pacienteService.ObtenerDatosPaciente(cadena);
        }catch(Exception ex){
        }
        return pacientes;
    }

    @PutMapping(value = "/put/paciente")
    @ResponseBody
    public int registrarPaciente(@RequestBody Paciente paciente){
        int idPaciente;

        idPaciente = pacienteService.registrarPaciente(paciente);
        return idPaciente;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/actualizarPacienteShort")
    @ResponseBody
    public int actualizarPaciente(@RequestBody String pv_datos){
        int n=0;
        Paciente paciente= new Paciente();
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_paciente = Integer.parseInt(job.get("pn_id_paciente").toString());
            String pv_telefono = job.get("pv_telefono").toString();
            String pv_correo = job.get("pv_correo").toString();
            String pv_direccion = job.get("pv_direccion").toString();
            System.out.println(pn_id_paciente);
            paciente.setIdPersona(pn_id_paciente);
            paciente.setTelefono(pv_telefono);
            paciente.setCorreo(pv_correo);
            paciente.setDireccion(pv_direccion);
            n = pacienteService.actualizarPaciente(paciente);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return n;
    }

    @DeleteMapping(value = "/delete/eliminarPaciente")
    @ResponseBody
    public int eliminarPaciente(@RequestBody Paciente paciente){
        int n;
        n = pacienteService.eliminarPaciente(paciente);
        return n;
    }
}
