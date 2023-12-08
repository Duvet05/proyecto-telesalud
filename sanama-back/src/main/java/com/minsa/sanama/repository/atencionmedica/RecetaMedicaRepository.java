package com.minsa.sanama.repository.atencionmedica;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.time.LocalDate;
import java.util.Map;

@Repository
public class RecetaMedicaRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    public RecetaMedicaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int registrarRecetaMedicaPrueba() {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_registrar_medicamentos_receta_ft")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_receta", Types.INTEGER),
                        new SqlParameter("pd_fecha_caducidad", Types.DATE),
                        new SqlParameter("pj_medicamentos_json", Types.VARCHAR)
                });

        // Crear un JSONArray con dos objetos JSONObject
        JSONArray jsonArray = new JSONArray();

        // Primer objeto
        JSONObject jsonObject1 = new JSONObject();
        jsonObject1.put("nombre", "Paracetamol");
        jsonObject1.put("indicacion", "Tomar después de las comidas");
        jsonArray.add(jsonObject1);

        // Segundo objeto
        JSONObject jsonObject2 = new JSONObject();
        jsonObject2.put("nombre", "Ibuprofeno");
        jsonObject2.put("indicacion", "Tomar con agua");
        jsonArray.add(jsonObject2);

        // Imprimir el resultado
        System.out.println(jsonArray.toJSONString());

        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pd_fecha_caducidad", LocalDate.now())
                .addValue("pj_medicamentos_json", jsonArray.toJSONString());

        System.out.println("Paso la lectura del procedure");

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return -1;
        } else {
            int idReceta = (int) result.get("pn_id_receta");
            return idReceta;
        }
    }
}
