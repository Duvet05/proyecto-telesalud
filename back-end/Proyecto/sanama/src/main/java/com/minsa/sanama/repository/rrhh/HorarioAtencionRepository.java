package com.minsa.sanama.repository.rrhh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

@Repository
public class HorarioAtencionRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public int registrarHorarioMedico(int idMedico, LocalTime horaInicio, LocalTime horaFin, LocalDate fecha) {
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
        mapSqlParameterSource
                .addValue("pn_id_medico", idMedico)
                .addValue("pt_hora_inicio", horaInicio)
                .addValue("pt_hora_fin", horaFin)
                .addValue("pd_fecha", fecha);

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return -1;
        } else {
            int nTurnos = (int) result.get("pn_nTurnos");
            return nTurnos;
        }
    }


}
