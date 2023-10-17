package com.minsa.sanama.repository.atencionmedica;

import com.minsa.sanama.model.admision.Paciente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.Map;

@Repository
public class HistorialClinicoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public int registrarHistorialClinico(Paciente paciente){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_registrar_historial_clinico")
                .declareParameters(new SqlParameter[]{
                        new SqlOutParameter("pn_id_historial_clinico ", Types.INTEGER),
                        new SqlParameter("pn_id_paciente ", Types.INTEGER),
                        new SqlParameter("pv_codigo", Types.VARCHAR),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_paciente", paciente.getIdPersona())
                .addValue("pv_codigo", paciente.getHistorialClinico().getCodigo())
                .addValue("pn_estado", 1);
        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            int idHistorialClinico = (int)result.get("pn_id_historial_clinico");
            return idHistorialClinico;
        }
    }
}
