package com.minsa.sanama.repository.laboratorio;

import com.minsa.sanama.model.laboratorio.ExamenMedico;
import com.minsa.sanama.model.rrhh.Especialidad;
import com.minsa.sanama.model.rrhh.Medico;
import com.minsa.sanama.model.rrhh.TurnoAtencion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public class ExamenMedicoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public int registrarExamenMedico(ExamenMedico examenMedico) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_lab_registrar_examen_medico")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_examen", Types.INTEGER),
                        new SqlParameter("pn_id_cita", Types.INTEGER),
                        new SqlParameter("pn_id_orden_laboratorio", Types.INTEGER),
                        new SqlParameter("pv_nombre_doctor_firmante", Types.VARCHAR),
                        new SqlParameter("pv_tipo", Types.VARCHAR),
                        new SqlParameter("pv_observaciones", Types.VARCHAR),
                        new SqlParameter("pv_archivo", Types.BLOB),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_cita", examenMedico.getOrdenLaboratorio().getCitaMedica().getIdCita())
                .addValue("pn_id_orden_laboratorio", examenMedico.getOrdenLaboratorio().getIdOrdenLaboratorio())
                .addValue("pv_nombre_doctor_firmante", examenMedico.getNombre())
                .addValue("pv_tipo", examenMedico.getTipo())
                .addValue("pv_observaciones", examenMedico.getObservaciones())
                .addValue("pv_archivo", examenMedico.getArchivo())
                .addValue("pn_estado", 1);

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return -1;
        } else {
            int idExamenMedico = (int) result.get("pn_id_examen");
            return idExamenMedico;
        }
    }
}
