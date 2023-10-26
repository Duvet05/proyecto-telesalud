package com.minsa.sanama.controller.laboratorio;

import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.model.laboratorio.ExamenMedico;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.services.laboratorio.ExamenMedicoService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laboratorio")
@CrossOrigin
public class ExamenMedicoController {
    @Autowired
    ExamenMedicoService examenmedicoService;
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/registrarExamenMedico")
    @ResponseBody
    public int registrarMedicos(@RequestBody String pv_datos) {
        int idExamenMedico=0;
        ExamenMedico examenMedico=new ExamenMedico();
        try{
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_cita = Integer.parseInt(job.get("pn_id_cita").toString());
            int pn_id_orden_laboratorio = Integer.parseInt(job.get("pn_id_orden_laboratorio").toString());
            String pv_nombre_doctor_firmante = job.get("pv_nombre_doctor_firmante").toString();
            String pv_tipo = job.get("pv_tipo").toString();
            String pv_observaciones = job.get("pv_observaciones").toString();
            byte[] pv_archivo = job.get("pv_archivo").toString().getBytes();
            int pn_estado = Integer.parseInt(job.get("pn_estado").toString());
            OrdenLaboratorio orden= new OrdenLaboratorio();
            CitaMedica cm= new CitaMedica();
            cm.setIdCita(pn_id_cita);
            orden.setCitaMedica(cm);
            orden.setIdOrdenLaboratorio(pn_id_orden_laboratorio);
            examenMedico.setOrdenLaboratorio(orden);
            examenMedico.setNombre(pv_nombre_doctor_firmante);
            examenMedico.setTipo(pv_tipo);
            examenMedico.setObservaciones(pv_observaciones);
            examenMedico.setArchivo(pv_archivo);
            examenMedico.setEstado(pn_estado);
            idExamenMedico = examenmedicoService.registrarExamenMedico(examenMedico);
        } catch(Exception ex){

        }
        return idExamenMedico;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            value = "/post/buscarExamenMedico")
    @ResponseBody
    public ExamenMedico buscarExamenMedico(@RequestBody String pv_datos){
        ExamenMedico examenMedico = null;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            String pv_filtro = job.get("pv_filtro").toString();
            examenMedico = examenmedicoService.buscarExamenMedico(pv_filtro);
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }

        return examenMedico;
    }
}
