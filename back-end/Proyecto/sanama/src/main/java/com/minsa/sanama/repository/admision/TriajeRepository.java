package com.minsa.sanama.repository.admision;

import com.minsa.sanama.model.admision.Triaje;
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
public class TriajeRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public TriajeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    public int registrarTriaje(int idCita,Triaje triaje){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_adm_registrar_triaje")
                .declareParameters(new SqlParameter[]{
                        new SqlOutParameter("pn_id_triaje", Types.INTEGER),
                        new SqlParameter("pn_id_cita", Types.INTEGER),
                        new SqlParameter("pn_id_enfermera", Types.INTEGER),
                        new SqlParameter("pv_codigo_triaje", Types.INTEGER),
                        new SqlParameter("pn_peso", Types.INTEGER),
                        new SqlParameter("pn_talla", Types.INTEGER),
                        new SqlParameter("pn_temperatura", Types.VARCHAR),
                        new SqlParameter("pv_motivo_visita", Types.VARCHAR),
                        new SqlParameter("pn_presion_arterial", Types.TIME),
                        new SqlParameter("pv_alergias", Types.DATE),
                        new SqlParameter("pv_prioridad", Types.VARCHAR),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_cita",idCita)
                .addValue("pn_id_enfermera", triaje.getEnfermera().getIdPersona())
                .addValue("pv_codigo_triaje", triaje.getCodigoTriaje())
                .addValue("pn_peso", triaje.getPeso())
                .addValue("pn_talla", triaje.getTalla())
                .addValue("pn_temperatura", triaje.getTemperatura())
                .addValue("pv_motivo_visita", triaje.getMotivoVisita())
                .addValue("pn_presion_arterial", triaje.getPresionArterial())
                .addValue("pv_alergias", triaje.getAlergias())
                .addValue("pv_prioridad", triaje.getPrioridad())
                .addValue("pn_estado", 1);

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            int idTriaje = (int)result.get("pn_id_triaje");
            return idTriaje;
        }
    }
}
