package com.minsa.sanama.repository.atencionmedica;

import com.minsa.sanama.model.atencionmedica.EvaluacionMedica;
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
public class EvaluacionMedicaRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public int registrarEvaluacionMedica(EvaluacionMedica evaluacionMedica) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_registrar_evaluacion_medica")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_evaluacion_medica", Types.INTEGER),
                        new SqlParameter("pn_id_hoja_medica", Types.INTEGER),
                        new SqlParameter("pv_motivo_consulta", Types.VARCHAR),
                        new SqlParameter("pv_antecendetes", Types.VARCHAR),
                        new SqlParameter("pv_examen_general", Types.VARCHAR),
                        new SqlParameter("pv_piel_y_faneras", Types.VARCHAR),
                        new SqlParameter("pv_cabeza_y_cuello", Types.VARCHAR),
                        new SqlParameter("pv_torax_y_pulmones", Types.VARCHAR),
                        new SqlParameter("pv_cardiovascular", Types.VARCHAR),
                        new SqlParameter("pv_abdomen", Types.VARCHAR),
                        new SqlParameter("pv_urogenital", Types.VARCHAR),
                        new SqlParameter("pv_extremidades", Types.VARCHAR),
                        new SqlParameter("pv_snc", Types.VARCHAR),
                        new SqlParameter("pn_glasgow", Types.VARCHAR),
                        new SqlParameter("pn_eyes_open", Types.VARCHAR),
                        new SqlParameter("pb_talking_correctly", Types.VARCHAR),
                        new SqlParameter("pb_able_to_move_body", Types.VARCHAR),
                        new SqlParameter("pv_observaciones", Types.VARCHAR),
                        new SqlParameter("pv_indicaciones_finales", Types.VARCHAR),
                        new SqlParameter("pb_requiere_signos_vitales", Types.BOOLEAN)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_hoja_medica", evaluacionMedica.getHojaMedica().getIdHojaMedica())
                .addValue("pv_motivo_consulta", evaluacionMedica.getMotivoConsulta())
                .addValue("pv_antecendetes", evaluacionMedica.getAntecedentes())
                .addValue("pv_examen_general", evaluacionMedica.getExamenGeneral())
                .addValue("pv_piel_y_faneras", evaluacionMedica.getPielYFaneras())
                .addValue("pv_cabeza_y_cuello", evaluacionMedica.getCabezaYCuello())
                .addValue("pv_torax_y_pulmones", evaluacionMedica.getToraxYPulmones())
                .addValue("pv_cardiovascular", evaluacionMedica.getCardiovascular())
                .addValue("pv_abdomen", evaluacionMedica.getAbdomen())
                .addValue("pv_urogenital", evaluacionMedica.getUrogenital())
                .addValue("pv_extremidades", evaluacionMedica.getExtremidades())
                .addValue("pv_snc", evaluacionMedica.getSnc())
                .addValue("pn_glasgow", evaluacionMedica.getGlasgow())
                .addValue("pn_eyes_open", evaluacionMedica.getEyesOpen())
                .addValue("pb_talking_correctly", evaluacionMedica.getTalkingCorrectly())
                .addValue("pb_able_to_move_body", evaluacionMedica.getAbleToMoveBody())
                .addValue("pv_observaciones", evaluacionMedica.getObservaciones())
                .addValue("pv_indicaciones_finales", evaluacionMedica.getIndicacionesFinales())
                .addValue("pb_requiere_signos_vitales", evaluacionMedica.isRequiereSignosVitales());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            int idEvaluacionMedica = (int)result.get("pn_id_evaluacion_medica");
            return idEvaluacionMedica;
        }
    }


    public int actualizarEvaluacionMedica(EvaluacionMedica evaluacionMedica) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_actualizar_evaluacion_medica")
                .declareParameters(new SqlParameter[] {
                        new SqlParameter("pn_id_evaluacion_medica", Types.INTEGER),
                        new SqlParameter("pv_motivo_consulta", Types.VARCHAR),
                        new SqlParameter("pv_antecendetes", Types.VARCHAR),
                        new SqlParameter("pv_examen_general", Types.VARCHAR),
                        new SqlParameter("pv_piel_y_faneras", Types.VARCHAR),
                        new SqlParameter("pv_cabeza_y_cuello", Types.VARCHAR),
                        new SqlParameter("pv_torax_y_pulmones", Types.VARCHAR),
                        new SqlParameter("pv_cardiovascular", Types.VARCHAR),
                        new SqlParameter("pv_abdomen", Types.VARCHAR),
                        new SqlParameter("pv_urogenital", Types.VARCHAR),
                        new SqlParameter("pv_extremidades", Types.VARCHAR),
                        new SqlParameter("pv_snc", Types.VARCHAR),
                        new SqlParameter("pn_glasgow", Types.INTEGER),
                        new SqlParameter("pn_eyes_open", Types.INTEGER),
                        new SqlParameter("pb_talking_correctly", Types.BOOLEAN),
                        new SqlParameter("pb_able_to_move_body", Types.BOOLEAN),
                        new SqlParameter("pv_observaciones", Types.VARCHAR),
                        new SqlParameter("pv_indicaciones_finales", Types.VARCHAR),
                        new SqlParameter("pb_requiere_signos_vitales", Types.BOOLEAN)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_evaluacion_medica", evaluacionMedica.getIdEvaluacion())
                .addValue("pv_motivo_consulta", evaluacionMedica.getMotivoConsulta())
                .addValue("pv_antecendetes", evaluacionMedica.getAntecedentes())
                .addValue("pv_examen_general", evaluacionMedica.getExamenGeneral())
                .addValue("pv_piel_y_faneras", evaluacionMedica.getPielYFaneras())
                .addValue("pv_cabeza_y_cuello", evaluacionMedica.getCabezaYCuello())
                .addValue("pv_torax_y_pulmones", evaluacionMedica.getToraxYPulmones())
                .addValue("pv_cardiovascular", evaluacionMedica.getCardiovascular())
                .addValue("pv_abdomen", evaluacionMedica.getAbdomen())
                .addValue("pv_urogenital", evaluacionMedica.getUrogenital())
                .addValue("pv_extremidades", evaluacionMedica.getExtremidades())
                .addValue("pv_snc", evaluacionMedica.getSnc())
                .addValue("pn_glasgow", evaluacionMedica.getGlasgow())
                .addValue("pn_eyes_open", evaluacionMedica.getEyesOpen())
                .addValue("pb_talking_correctly", evaluacionMedica.getTalkingCorrectly())
                .addValue("pb_able_to_move_body", evaluacionMedica.getAbleToMoveBody())
                .addValue("pv_observaciones", evaluacionMedica.getObservaciones())
                .addValue("pv_indicaciones_finales", evaluacionMedica.getIndicacionesFinales())
                .addValue("pb_requiere_signos_vitales", evaluacionMedica.isRequiereSignosVitales());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            return 1;
        }
    }

}
