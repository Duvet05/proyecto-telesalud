package com.minsa.sanama.repository.laboratorio;

import com.minsa.sanama.model.laboratorio.ExamenMedico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.Map;

@Repository
public class ExamenMedicoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public ExamenMedicoRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate;}

    private final ExamenMedicoRepository.ExamenMedicoMapper examenMedicoMapper = new ExamenMedicoRepository.ExamenMedicoMapper();

    public int registrarExamenMedico(ExamenMedico examenMedico,int pn_id_orden) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_lab_registrar_examen_medico")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_examen", Types.INTEGER),
                        new SqlParameter("pn_id_orden_laboratorio", Types.INTEGER),
                        new SqlParameter("pv_nombre_archivo", Types.VARCHAR),
                        new SqlParameter("pv_tipo_prueba", Types.VARCHAR),
                        new SqlParameter("pb_data_archivo", Types.BLOB)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_orden_laboratorio", pn_id_orden)
                .addValue("pv_nombre_archivo", examenMedico.getNombreArchivo())
                .addValue("pv_tipo_prueba", examenMedico.getTipoPrueba())
                .addValue("pb_data_archivo", examenMedico.getArchivo());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return -1;
        } else {
            int idExamenMedico = (int) result.get("pn_id_examen");
            return idExamenMedico;
        }
    }

    public List<ExamenMedico> buscarExamenMedico(String pn_id_orden) {
        String procedureCall = "{call dbSanama.ssm_lab_buscar_examen_medico('"+pn_id_orden+"')};";
        return jdbcTemplate.query(procedureCall, examenMedicoMapper);
    }

    private static class ExamenMedicoMapper implements RowMapper<ExamenMedico> {
        @Override
        public ExamenMedico mapRow(ResultSet rs, int rowNum) throws SQLException {
            ExamenMedico examen = new ExamenMedico();

            examen.setIdExamen(rs.getInt("id_examen"));
            examen.setNombreArchivo(rs.getString("nombre_archivo"));
            examen.setArchivo(rs.getBytes("archivo"));

            return examen;
        }
    }
}
