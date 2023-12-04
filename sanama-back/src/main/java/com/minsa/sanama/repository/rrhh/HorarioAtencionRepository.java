package com.minsa.sanama.repository.rrhh;

import com.minsa.sanama.model.rrhh.TurnoAtencion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public class HorarioAtencionRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public int registrarHorarioMedico(int idMedico, String pd_fecha_inicio, String pd_fecha_fin, List<TurnoAtencion> turnos) {
        String procedureCall ="{call dbSanama.ssm_rrhh_eliminar_turno_atencion(" + idMedico + ",'"
                + pd_fecha_inicio + "','"+pd_fecha_fin+"')}";
        jdbcTemplate.update(procedureCall);

        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_rrhh_registrar_turno_atencion")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_nTurnos", Types.INTEGER),
                        new SqlParameter("pn_id_medico", Types.INTEGER),
                        new SqlParameter("pt_hora_inicio", Types.TIME),
                        new SqlParameter("pt_hora_fin", Types.TIME),
                        new SqlParameter("pd_fecha", Types.DATE)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();

        LocalDate fecha_inicio=LocalDate.parse(pd_fecha_inicio);
        LocalDate fecha_fin=LocalDate.parse(pd_fecha_fin);
        int nTurnos =0;
        for (TurnoAtencion turno : turnos) {
            if(!fecha_inicio.isAfter(turno.getFecha()) && !fecha_fin.isBefore(turno.getFecha())){
                mapSqlParameterSource
                        .addValue("pn_id_medico", idMedico)
                        .addValue("pt_hora_inicio", turno.getHoraInicio())
                        .addValue("pt_hora_fin", turno.getHoraFin())
                        .addValue("pd_fecha", turno.getFecha());

                Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
                if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
                    return -1;
                } else {
                    nTurnos += (int) result.get("pn_nTurnos");
                }
            }
        }

        return nTurnos;
    }
}
