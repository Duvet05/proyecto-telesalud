package com.minsa.sanama.controller.rrhh;

import com.minsa.sanama.model.rrhh.TurnoAtencion;
import com.minsa.sanama.services.rrhh.HorarioAtencionService;
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
            System.out.println(pv_datos);
            JSONObject job = (JSONObject) new JSONParser().parse(pv_datos);
            int pn_id_medico = Integer.parseInt(job.get("pn_id_medico").toString());
            String pd_fecha_inicio = job.get("pd_fecha_inicio").toString();
            String pd_fecha_fin = job.get("pd_fecha_fin").toString();

            List<TurnoAtencion> turnosAtencion = new ArrayList<>();
            JSONArray arregloHorarios = (JSONArray) job.get("arregloHorarios");

            for (Object horarioObject : arregloHorarios) {
                JSONObject horario = (JSONObject) horarioObject;
                String horaInicio = horario.get("horaInicio").toString();
                String horaFin = horario.get("horaFin").toString();
                String fecha = horario.get("fecha").toString();

                // Crear objetos TurnoAtencion y agregarlos a la lista
                TurnoAtencion turno = new TurnoAtencion();
                turno.setHoraInicio(LocalTime.parse(horaInicio));
                turno.setHoraFin(LocalTime.parse(horaFin));
                turno.setFecha(LocalDate.parse(fecha));
                System.out.println(turno.getHoraInicio().toString()+" "+turno.getFecha().toString());
                turnosAtencion.add(turno);
            }

            /*LocalTime pt_hora_inicio = LocalTime.parse(job.get("pt_hora_inicio").toString(),
                    DateTimeFormatter.ofPattern("HH:mm"));
            LocalTime pt_hora_fin = LocalTime.parse(job.get("pt_hora_fin").toString(),
                    DateTimeFormatter.ofPattern("HH:mm"));
            LocalDate pd_fecha = LocalDate.parse(job.get("pd_fecha").toString());*/

            idHorario = horarioAtencionService.registrarHorarioMedico(pn_id_medico, pd_fecha_inicio, pd_fecha_fin, turnosAtencion);
            return idHorario;
        } catch (Exception ex) {
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }

        return -1;
    }
}
