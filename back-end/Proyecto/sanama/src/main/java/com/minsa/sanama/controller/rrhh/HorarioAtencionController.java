package com.minsa.sanama.controller.rrhh;

import com.minsa.sanama.services.rrhh.HorarioAtencionService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/rrhh")
@CrossOrigin
public class HorarioAtencionController {
    @Autowired
    HorarioAtencionService horarioAtencionService;

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_JSON_VALUE }, value = "/post/registrarHorarioMedico")
    @ResponseBody
    public int registrarHorarioMedico(@RequestBody String pv_datos) {
        int idHorario = -1;
        try {
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_medico = Integer.parseInt(job.get("pn_id_medico").toString());
            LocalTime pt_hora_inicio = LocalTime.parse(job.get("pt_hora_inicio").toString(),
                    DateTimeFormatter.ofPattern("HH:mm"));
            LocalTime pt_hora_fin = LocalTime.parse(job.get("pt_hora_fin").toString(),
                    DateTimeFormatter.ofPattern("HH:mm"));
            LocalDate pd_fecha = LocalDate.parse(job.get("pd_fecha").toString());
            System.out.println(pv_datos);
            idHorario = horarioAtencionService.registrarHorarioMedico(pn_id_medico, pt_hora_inicio, pt_hora_fin,
                    pd_fecha);

        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }

        return idHorario;
    }
}
