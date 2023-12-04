package com.minsa.sanama.repository.atencionmedica;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.admision.ProgramacionCita;
import com.minsa.sanama.model.admision.Triaje;
import com.minsa.sanama.model.atencionmedica.*;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.model.rrhh.Especialidad;
import com.minsa.sanama.model.rrhh.Medico;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.nio.charset.StandardCharsets;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Repository
public class HojaMedicaRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    public HojaMedicaRepository(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}
    private final TriajeMap triajeMap = new TriajeMap();
    private final HojaMedicaMapper hojaMedicaMapper = new HojaMedicaMapper();
    private final DatosResultadosMapper datosResultadosMapper = new DatosResultadosMapper();

    private final CodigoHojaMedicaMapper codigoHojaMedicaMapper = new CodigoHojaMedicaMapper();

    public List<HojaMedica> listarHojasMedicasFiltro(String pn_id_paciente, String pn_id_especialidad, String pd_fecha_inicio, String pd_fecha_fin) {
        if (pn_id_paciente != null)pn_id_paciente = "'"+pn_id_paciente+"'";
        if (pn_id_especialidad != null)pn_id_especialidad = "'"+pn_id_especialidad+"'";
        if (pd_fecha_inicio != null)pd_fecha_inicio = "'"+pd_fecha_inicio+"'";
        if (pd_fecha_fin != null)pd_fecha_fin = "'"+pd_fecha_fin+"'";
        String procedureCall = "{call dbSanama.ssm_ate_listar_hoja_medica_filtro("+pn_id_paciente+","+pn_id_especialidad+","+pd_fecha_inicio+","+pd_fecha_fin+")};";
        return jdbcTemplate.query(procedureCall, hojaMedicaMapper);
    }

    public List<ProgramacionCita> buscarTriajeCitaMedica(int pn_id_cita) {
        String procedureCall = "{call dbSanama.ssm_ate_buscar_triaje_x_cita_medica("+pn_id_cita+")};";
        return jdbcTemplate.query(procedureCall, triajeMap);
    }

    public List<HojaMedica> buscarDatosResultadosHojaMedica(int pn_id_hoja_medica) {
        String procedureCall = "{call dbSanama.ssm_ate_buscar_resultados_hoja_medica("+pn_id_hoja_medica+")};";
        return jdbcTemplate.query(procedureCall, datosResultadosMapper);
    }

    public List<HojaMedica> mostrarCodigoHojaMedicaCita(int pn_id_cita) {
        String procedureCall = "{call dbSanama.ssm_ate_mostrar_codigo_hoja_medica_x_cita("+pn_id_cita+")};";
        return jdbcTemplate.query(procedureCall, codigoHojaMedicaMapper);
    }

    private static class DatosResultadosMapper implements RowMapper<HojaMedica> {
        @Override
        public HojaMedica mapRow(ResultSet rs, int rowNum) throws SQLException {

            HojaMedica hojaMedica = new HojaMedica();

            hojaMedica.setMedicoConsulta(rs.getString("nombre_medico"));
            hojaMedica.setObservaciones(rs.getString("observaciones"));

            return hojaMedica;
        }
    }

    private static class CodigoHojaMedicaMapper implements RowMapper<HojaMedica> {
        @Override
        public HojaMedica mapRow(ResultSet rs, int rowNum) throws SQLException {

            HojaMedica hojaMedica = new HojaMedica();

            hojaMedica.setCodigo(rs.getString("codigo"));

            return hojaMedica;
        }
    }

    private static class HojaMedicaMapper implements RowMapper<HojaMedica> {
        @Override
        public HojaMedica mapRow(ResultSet rs, int rowNum) throws SQLException {

            HojaMedica hojaMedica = new HojaMedica();

            hojaMedica.setIdHojaMedica(rs.getInt("id_hoja_medica"));
            hojaMedica.setCodigo(rs.getString("codigo"));
            hojaMedica.setFechaAtencion(rs.getDate("fecha_atencion").toLocalDate());
            hojaMedica.setHoraAtencion(rs.getTime("hora_atencion").toLocalTime());
            hojaMedica.setCitaMedica(new CitaMedica());
            hojaMedica.getCitaMedica().setMedico(new Medico());
            hojaMedica.getCitaMedica().getMedico().setNombres(rs.getString("nombres"));
            hojaMedica.getCitaMedica().getMedico().setApellidoPaterno(rs.getString("apellido_paterno"));
            hojaMedica.getCitaMedica().getMedico().setApellidoMaterno(rs.getString("apellido_materno"));
            hojaMedica.getCitaMedica().getMedico().setEspecialidad(new Especialidad());
            hojaMedica.getCitaMedica().getMedico().getEspecialidad().setNombre(rs.getString("nombre_especialidad"));

            return hojaMedica;
        }
    }

    public int registrarHojaMedica(HojaMedica hojaMedica,int pn_id_historial) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_registrar_hoja_medica")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_hoja_medica", Types.INTEGER),
                        new SqlParameter("pn_id_historial_clinico", Types.INTEGER),
                        new SqlParameter("pn_id_cita_medica", Types.INTEGER),
                        new SqlParameter("pn_id_hoja_referenciadad", Types.INTEGER),
                        new SqlParameter("pv_codigo", Types.VARCHAR),
                        new SqlParameter("pv_fecha_atencion", Types.DATE),
                        new SqlParameter("pt_hora_atencion", Types.TIME),
                        new SqlParameter("pb_firma", Types.BLOB),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();

        if(hojaMedica.getHojaRefencia() != null){
            mapSqlParameterSource
                    .addValue("pn_id_historial_clinico", pn_id_historial)
                    .addValue("pn_id_cita_medica", hojaMedica.getIdCitaMedica())
                    .addValue("pn_id_hoja_referenciadad", hojaMedica.getHojaRefencia().getIdHojaReferenciada())
                    .addValue("pv_codigo", hojaMedica.getCodigo())
                    .addValue("pv_fecha_atencion", hojaMedica.getFechaAtencion())
                    .addValue("pt_hora_atencion", hojaMedica.getHoraAtencion())
                    .addValue("pb_firma", hojaMedica.getFirma())
                    .addValue("pn_estado", hojaMedica.getEstado());
        }
        else{

            mapSqlParameterSource
                    .addValue("pn_id_historial_clinico", pn_id_historial)
                    .addValue("pn_id_cita_medica", hojaMedica.getIdCitaMedica())
                    .addValue("pn_id_hoja_referenciadad", hojaMedica.getHojaRefencia())
                    .addValue("pv_codigo", hojaMedica.getCodigo())
                    .addValue("pv_fecha_atencion", hojaMedica.getFechaAtencion())
                    .addValue("pt_hora_atencion", hojaMedica.getHoraAtencion())
                    .addValue("pb_firma", hojaMedica.getFirma())
                    .addValue("pn_estado", hojaMedica.getEstado());
        }
        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            int idHojaMedica = (int)result.get("pn_id_hoja_medica");
            return idHojaMedica;
        }
    }

    public int eliminarHojaMedica(String pn_id_hoja_medica) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_eliminar_hoja_medica")
                .declareParameters(new SqlParameter[] {
                        new SqlParameter("pn_id_hoja_medica", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_hoja_medica", pn_id_hoja_medica);

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            return 1;
        }
    }

    private static class TriajeMap implements RowMapper<ProgramacionCita> {
        @Override
        public ProgramacionCita mapRow(ResultSet rs, int rowNum) throws SQLException {
            ProgramacionCita programacionCita = new ProgramacionCita();

            Paciente paciente = new Paciente();
            if(rs.getInt("id_triaje") != 0 && rs.getInt("estado") == 1){
                Triaje triaje = new Triaje();

                // Mapea los campos de Triaje
                triaje.setPeso(rs.getInt("peso"));
                triaje.setTalla(rs.getInt("talla"));
                triaje.setTemperatura(rs.getInt("temperatura"));
                triaje.setPresionSistolica(rs.getString("presion_sistolica"));
                triaje.setPresionDiastolica(rs.getString("presion_diastolica"));
                triaje.setSaturacionOxigeno(rs.getString("saturacionOxigeno"));
                triaje.setFrecuenciaCardiaca(rs.getString("frecuenciaCardiaca"));
                triaje.setFrecuenciaRespiratoria(rs.getString("frecuenciaRespiratoria"));
                programacionCita.setTriaje(triaje);
            }

            paciente.setNombres(rs.getString("nombres"));
            paciente.setApellidoPaterno(rs.getString("apellido_paterno"));
            paciente.setApellidoMaterno(rs.getString("apellido_materno"));
            paciente.setSexo(rs.getString("sexo"));
            paciente.setFechaNacimiento(rs.getDate("fecha_nacimiento").toLocalDate());


            programacionCita.setPaciente(paciente);

            return programacionCita;
        }
    }

    public int registrarNuevaHojaMedica(HojaMedica hojaMedica) {
        List<Medicamento> lmedicamentos;
        lmedicamentos = hojaMedica.getRecetaMedica().getMedicamentos();

        System.out.println("Funcion Registrar nueva Hoja Medica");
        // Crear un JSONArray de Medicamentos con los objetos JSONObject
        JSONArray jsonArrayMedicamentos = new JSONArray();
        for(Medicamento medicamento : lmedicamentos){
            // Inicializamos el objeto
            JSONObject jsonObjectMedicamento = new JSONObject();
            jsonObjectMedicamento.put("nombre", medicamento.getNombre());
            jsonObjectMedicamento.put("indicacion", medicamento.getIndicacion());
            jsonArrayMedicamentos.add(jsonObjectMedicamento);
        }
        // Imprimir el resultado
        System.out.println(jsonArrayMedicamentos.toJSONString());

        List<Diagnostico> ldiagnosticos;
        ldiagnosticos = hojaMedica.getEvaluacionMedica().getDiagnosticos();
        // Crear un JSONArray de Diagnosticos con los objetos JSONObject
        JSONArray jsonArrayDiagnosticos = new JSONArray();
        for(Diagnostico diagnostico : ldiagnosticos){
            // Inicializamos el objeto
            JSONObject jsonObjectDiagnostico = new JSONObject();
            jsonObjectDiagnostico.put("idDiagnostico", diagnostico.getIdDiagnostico());
            jsonArrayDiagnosticos.add(jsonObjectDiagnostico);
        }
        // Imprimir el resultado
        System.out.println(jsonArrayDiagnosticos.toJSONString());

        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_registrar_nueva_hoja_medica")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_hoja_medica", Types.INTEGER),
                        new SqlParameter("pn_id_cita_medica", Types.INTEGER),
                        new SqlParameter("pn_id_hoja_referenciada", Types.INTEGER),
                        new SqlParameter("pb_firma", Types.BLOB),
                        new SqlParameter("pd_fecha_caducidad", Types.DATE),
                        new SqlParameter("pj_medicamentos_json", Types.VARCHAR),
                        new SqlParameter("pn_temperatura", Types.VARCHAR),
                        new SqlParameter("pn_frecuencia_cardiaca", Types.VARCHAR),
                        new SqlParameter("pn_frecuencia_respiratoria", Types.VARCHAR),
                        new SqlParameter("pn_presion_arterial", Types.VARCHAR),
                        new SqlParameter("pn_saturacion_oxigeno", Types.VARCHAR),
                        new SqlParameter("pn_peso", Types.VARCHAR),
                        new SqlParameter("pn_talla", Types.VARCHAR),
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
                        new SqlParameter("pj_diagnosticos_json", Types.VARCHAR)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();

        if(hojaMedica.getHojaRefencia() != null){
            mapSqlParameterSource
                    .addValue("pn_id_cita_medica", hojaMedica.getIdCitaMedica())
                    .addValue("pn_id_hoja_referenciada", hojaMedica.getHojaRefencia().getIdHojaReferenciada())
                    .addValue("pb_firma", hojaMedica.getFirma())
                    .addValue("pd_fecha_caducidad", hojaMedica.getRecetaMedica().getFechaCaducidad())
                    .addValue("pj_medicamentos_json", jsonArrayMedicamentos.toJSONString())
                    .addValue("pn_temperatura", hojaMedica.getEvaluacionMedica().getSignosVitales().getTemperatura())
                    .addValue("pn_frecuencia_cardiaca", hojaMedica.getEvaluacionMedica().getSignosVitales().getFrecuenciaCardiaca())
                    .addValue("pn_frecuencia_respiratoria", hojaMedica.getEvaluacionMedica().getSignosVitales().getFrecuenciaRespiratoria())
                    .addValue("pn_presion_arterial", hojaMedica.getEvaluacionMedica().getSignosVitales().getPresionArterial())
                    .addValue("pn_saturacion_oxigeno", hojaMedica.getEvaluacionMedica().getSignosVitales().getSaturacionOxigeno())
                    .addValue("pn_peso", hojaMedica.getEvaluacionMedica().getSignosVitales().getPeso())
                    .addValue("pn_talla", hojaMedica.getEvaluacionMedica().getSignosVitales().getTalla())
                    .addValue("pv_motivo_consulta", hojaMedica.getEvaluacionMedica().getMotivoConsulta())
                    .addValue("pv_antecendetes", hojaMedica.getEvaluacionMedica().getAntecedentes())
                    .addValue("pv_examen_general", hojaMedica.getEvaluacionMedica().getExamenGeneral())
                    .addValue("pv_piel_y_faneras", hojaMedica.getEvaluacionMedica().getPielYFaneras())
                    .addValue("pv_cabeza_y_cuello", hojaMedica.getEvaluacionMedica().getCabezaYCuello())
                    .addValue("pv_torax_y_pulmones", hojaMedica.getEvaluacionMedica().getToraxYPulmones())
                    .addValue("pv_cardiovascular", hojaMedica.getEvaluacionMedica().getCardiovascular())
                    .addValue("pv_abdomen", hojaMedica.getEvaluacionMedica().getAbdomen())
                    .addValue("pv_urogenital", hojaMedica.getEvaluacionMedica().getUrogenital())
                    .addValue("pv_extremidades", hojaMedica.getEvaluacionMedica().getExtremidades())
                    .addValue("pv_snc", hojaMedica.getEvaluacionMedica().getSnc())
                    .addValue("pn_glasgow", hojaMedica.getEvaluacionMedica().getGlasgow())
                    .addValue("pn_eyes_open", hojaMedica.getEvaluacionMedica().getEyesOpen())
                    .addValue("pb_talking_correctly", hojaMedica.getEvaluacionMedica().getTalkingCorrectly())
                    .addValue("pb_able_to_move_body", hojaMedica.getEvaluacionMedica().getAbleToMoveBody())
                    .addValue("pv_observaciones", hojaMedica.getEvaluacionMedica().getObservaciones())
                    .addValue("pv_indicaciones_finales", hojaMedica.getEvaluacionMedica().getIndicacionesFinales())
                    .addValue("pj_diagnosticos_json", jsonArrayDiagnosticos.toJSONString());
        }
        else{
            mapSqlParameterSource
                    .addValue("pn_id_cita_medica", hojaMedica.getIdCitaMedica())
                    .addValue("pn_id_hoja_referenciada", hojaMedica.getHojaRefencia())
                    .addValue("pb_firma", hojaMedica.getFirma())
                    .addValue("pd_fecha_caducidad", hojaMedica.getRecetaMedica().getFechaCaducidad())
                    .addValue("pj_medicamentos_json", jsonArrayMedicamentos.toJSONString())
                    .addValue("pn_temperatura", hojaMedica.getEvaluacionMedica().getSignosVitales().getTemperatura())
                    .addValue("pn_frecuencia_cardiaca", hojaMedica.getEvaluacionMedica().getSignosVitales().getFrecuenciaCardiaca())
                    .addValue("pn_frecuencia_respiratoria", hojaMedica.getEvaluacionMedica().getSignosVitales().getFrecuenciaRespiratoria())
                    .addValue("pn_presion_arterial", hojaMedica.getEvaluacionMedica().getSignosVitales().getPresionArterial())
                    .addValue("pn_saturacion_oxigeno", hojaMedica.getEvaluacionMedica().getSignosVitales().getSaturacionOxigeno())
                    .addValue("pn_peso", hojaMedica.getEvaluacionMedica().getSignosVitales().getPeso())
                    .addValue("pn_talla", hojaMedica.getEvaluacionMedica().getSignosVitales().getTalla())
                    .addValue("pv_motivo_consulta", hojaMedica.getEvaluacionMedica().getMotivoConsulta())
                    .addValue("pv_antecendetes", hojaMedica.getEvaluacionMedica().getAntecedentes())
                    .addValue("pv_examen_general", hojaMedica.getEvaluacionMedica().getExamenGeneral())
                    .addValue("pv_piel_y_faneras", hojaMedica.getEvaluacionMedica().getPielYFaneras())
                    .addValue("pv_cabeza_y_cuello", hojaMedica.getEvaluacionMedica().getCabezaYCuello())
                    .addValue("pv_torax_y_pulmones", hojaMedica.getEvaluacionMedica().getToraxYPulmones())
                    .addValue("pv_cardiovascular", hojaMedica.getEvaluacionMedica().getCardiovascular())
                    .addValue("pv_abdomen", hojaMedica.getEvaluacionMedica().getAbdomen())
                    .addValue("pv_urogenital", hojaMedica.getEvaluacionMedica().getUrogenital())
                    .addValue("pv_extremidades", hojaMedica.getEvaluacionMedica().getExtremidades())
                    .addValue("pv_snc", hojaMedica.getEvaluacionMedica().getSnc())
                    .addValue("pn_glasgow", hojaMedica.getEvaluacionMedica().getGlasgow())
                    .addValue("pn_eyes_open", hojaMedica.getEvaluacionMedica().getEyesOpen())
                    .addValue("pb_talking_correctly", hojaMedica.getEvaluacionMedica().getTalkingCorrectly())
                    .addValue("pb_able_to_move_body", hojaMedica.getEvaluacionMedica().getAbleToMoveBody())
                    .addValue("pv_observaciones", hojaMedica.getEvaluacionMedica().getObservaciones())
                    .addValue("pv_indicaciones_finales", hojaMedica.getEvaluacionMedica().getIndicacionesFinales())
                    .addValue("pj_diagnosticos_json", jsonArrayDiagnosticos.toJSONString());
        }
        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            int idHojaMedica = (int)result.get("pn_id_hoja_medica");
            return idHojaMedica;
        }
    }

    public HojaMedica buscarHojaMedicaPaciente(int pn_id_hoja_medica) {
        HojaMedica hojaMedica = new HojaMedica();
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_buscar_hoja_medica_paciente")
                .declareParameters(new SqlParameter[]{
                        new SqlParameter("pn_id_hoja_medica", Types.INTEGER),
                        new SqlOutParameter("pn_id_hoja_referenciada", Types.INTEGER),
                        new SqlOutParameter("pv_codigo_hoja_medica", Types.VARCHAR),
                        new SqlOutParameter("pb_firma", Types.BLOB),
                        new SqlOutParameter("pd_fecha_caducidad", Types.DATE),
                        new SqlOutParameter("pj_medicamentos_json", Types.VARCHAR),
                        new SqlOutParameter("pn_temperatura", Types.VARCHAR),
                        new SqlOutParameter("pn_frecuencia_cardiaca", Types.VARCHAR),
                        new SqlOutParameter("pn_frecuencia_respiratoria", Types.VARCHAR),
                        new SqlOutParameter("pn_presion_arterial", Types.VARCHAR),
                        new SqlOutParameter("pn_saturacion_oxigeno", Types.VARCHAR),
                        new SqlOutParameter("pn_peso", Types.VARCHAR),
                        new SqlOutParameter("pn_talla", Types.VARCHAR),
                        new SqlOutParameter("pv_motivo_consulta", Types.VARCHAR),
                        new SqlOutParameter("pv_antecendetes", Types.VARCHAR),
                        new SqlOutParameter("pv_examen_general", Types.VARCHAR),
                        new SqlOutParameter("pv_piel_y_faneras", Types.VARCHAR),
                        new SqlOutParameter("pv_cabeza_y_cuello", Types.VARCHAR),
                        new SqlOutParameter("pv_torax_y_pulmones", Types.VARCHAR),
                        new SqlOutParameter("pv_cardiovascular", Types.VARCHAR),
                        new SqlOutParameter("pv_abdomen", Types.VARCHAR),
                        new SqlOutParameter("pv_urogenital", Types.VARCHAR),
                        new SqlOutParameter("pv_extremidades", Types.VARCHAR),
                        new SqlOutParameter("pv_snc", Types.VARCHAR),
                        new SqlOutParameter("pn_glasgow", Types.VARCHAR),
                        new SqlOutParameter("pn_eyes_open", Types.VARCHAR),
                        new SqlOutParameter("pb_talking_correctly", Types.VARCHAR),
                        new SqlOutParameter("pb_able_to_move_body", Types.VARCHAR),
                        new SqlOutParameter("pv_observaciones", Types.VARCHAR),
                        new SqlOutParameter("pv_indicaciones_finales", Types.VARCHAR),
                        new SqlOutParameter("pj_diagnosticos_json", Types.VARCHAR)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource.addValue("pn_id_hoja_medica", pn_id_hoja_medica);

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return null;
        } else {
            hojaMedica.setHojaRefencia(new HojaRefencia());
            if(result.get("pn_id_hoja_referenciada")==null){
                hojaMedica.getHojaRefencia().setIdHojaReferenciada(-1);
            }
            else{
                hojaMedica.getHojaRefencia().setIdHojaReferenciada((int) result.get("pn_id_hoja_referenciada"));
            }

            hojaMedica.setCodigo(result.get("pv_codigo_hoja_medica").toString());
            //String archivoString = (String) result.get("pb_firma");
            //hojaMedica.setFirma(archivoString.getBytes(StandardCharsets.UTF_8));
            hojaMedica.setFirma((byte[]) result.get("pb_firma"));
            hojaMedica.setEvaluacionMedica(new EvaluacionMedica());
            hojaMedica.getEvaluacionMedica().setSignosVitales(new SignosVitales());
            hojaMedica.getEvaluacionMedica().getSignosVitales().setTemperatura((String) result.get("pn_temperatura"));
            hojaMedica.getEvaluacionMedica().getSignosVitales().setFrecuenciaCardiaca((String) result.get("pn_frecuencia_cardiaca"));
            hojaMedica.getEvaluacionMedica().getSignosVitales().setFrecuenciaRespiratoria((String) result.get("pn_frecuencia_respiratoria"));
            hojaMedica.getEvaluacionMedica().getSignosVitales().setPresionArterial((String) result.get("pn_presion_arterial"));
            hojaMedica.getEvaluacionMedica().getSignosVitales().setSaturacionOxigeno((String) result.get("pn_saturacion_oxigeno"));
            hojaMedica.getEvaluacionMedica().getSignosVitales().setPeso((String) result.get("pn_peso"));
            hojaMedica.getEvaluacionMedica().getSignosVitales().setTalla((String) result.get("pn_talla"));
            hojaMedica.getEvaluacionMedica().setMotivoConsulta((String) result.get("pv_motivo_consulta"));
            hojaMedica.getEvaluacionMedica().setAntecedentes((String) result.get("pv_antecendetes"));
            hojaMedica.getEvaluacionMedica().setExamenGeneral((String) result.get("pv_examen_general"));
            hojaMedica.getEvaluacionMedica().setPielYFaneras((String) result.get("pv_piel_y_faneras"));
            hojaMedica.getEvaluacionMedica().setCabezaYCuello((String) result.get("pv_cabeza_y_cuello"));
            hojaMedica.getEvaluacionMedica().setToraxYPulmones((String) result.get("pv_torax_y_pulmones"));
            hojaMedica.getEvaluacionMedica().setCardiovascular((String) result.get("pv_cardiovascular"));
            hojaMedica.getEvaluacionMedica().setAbdomen((String) result.get("pv_abdomen"));
            hojaMedica.getEvaluacionMedica().setUrogenital((String) result.get("pv_urogenital"));
            hojaMedica.getEvaluacionMedica().setExtremidades((String) result.get("pv_extremidades"));
            hojaMedica.getEvaluacionMedica().setSnc((String) result.get("pv_snc"));
            hojaMedica.getEvaluacionMedica().setGlasgow((String) result.get("pn_glasgow"));
            hojaMedica.getEvaluacionMedica().setEyesOpen((String) result.get("pn_eyes_open"));
            hojaMedica.getEvaluacionMedica().setTalkingCorrectly((String) result.get("pb_talking_correctly"));
            hojaMedica.getEvaluacionMedica().setAbleToMoveBody((String) result.get("pb_able_to_move_body"));
            hojaMedica.getEvaluacionMedica().setObservaciones((String) result.get("pv_observaciones"));
            hojaMedica.getEvaluacionMedica().setIndicacionesFinales((String) result.get("pv_indicaciones_finales"));
            hojaMedica.setRecetaMedica(new RecetaMedica());
            hojaMedica.getRecetaMedica().setFechaCaducidad(LocalDate.parse(result.get("pd_fecha_caducidad").toString()));

            // obtenemos el json de medicamentos y de diagnosticos
            String jsonMedicamentos = (String) result.get("pj_medicamentos_json");
            String jsonDiagnosticos = (String) result.get("pj_diagnosticos_json");
            hojaMedica.getEvaluacionMedica().setDiagnosticos(obtenerDiagnosticos(jsonDiagnosticos));
            hojaMedica.getRecetaMedica().setMedicamentos(obtenerMedicamentos(jsonMedicamentos));

            return hojaMedica;
        }
    }

    private List<Medicamento> obtenerMedicamentos(String jsonMedicamentos){
        List<Medicamento> lmedicamentos = new ArrayList<>();
        try{
            JSONArray jobArray = (JSONArray) new JSONParser().parse(jsonMedicamentos);
            for(Object obj: jobArray){
                Medicamento medicamento = new Medicamento();
                JSONObject jobMed = (JSONObject) obj;
                medicamento.setNombre(jobMed.get("nombre").toString());
                medicamento.setIndicacion(jobMed.get("indicacion").toString());

                lmedicamentos.add(medicamento);
            }
        }catch (Exception ex){
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return lmedicamentos;
    }

    private List<Diagnostico> obtenerDiagnosticos(String jsonDiagnosticos){
        List<Diagnostico> ldiagnosticos = new ArrayList<>();;
        try{
            JSONArray jobArray = (JSONArray) new JSONParser().parse(jsonDiagnosticos);
            for(Object obj: jobArray){
                Diagnostico diagnostico = new Diagnostico();
                JSONObject jobMed = (JSONObject) obj;
                diagnostico.setIdCiex(jobMed.get("id_ciex").toString());
                diagnostico.setCiex(jobMed.get("ciex").toString());
                ldiagnosticos.add(diagnostico);
            }
        }catch (Exception ex){
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return ldiagnosticos;
    }

    public HojaMedica buscarResultadosPaciente(int pn_id_hoja_medica) {
        HojaMedica hojaMedica = new HojaMedica();
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_ate_mostrar_resultados_paciente")
                .declareParameters(new SqlParameter[]{
                        new SqlParameter("pn_id_hoja_medica", Types.INTEGER),
                        new SqlOutParameter("pv_nombre_medico", Types.VARCHAR),
                        new SqlOutParameter("pv_observaciones", Types.VARCHAR),
                        new SqlOutParameter("pj_resultados", Types.VARCHAR)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource.addValue("pn_id_hoja_medica", pn_id_hoja_medica);

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return null;
        } else{

            Object nombreMedicoObject = result.get("pv_nombre_medico");
            hojaMedica.setMedicoConsulta(nombreMedicoObject != null ? nombreMedicoObject.toString() : "");

            Object observacionesObject = result.get("pv_observaciones");
            hojaMedica.setObservaciones(observacionesObject != null ? observacionesObject.toString() : "");

            // Manejamos el json de Resultados
            Object resultadosObject = result.get("pj_resultados");
            hojaMedica.setResultados(resultadosObject != null ? obtenerResultados(resultadosObject.toString()) : null);

            //String jsonResultados = (String) result.get("pj_resultados");
            //hojaMedica.setResultados(obtenerResultados(jsonResultados));

            return hojaMedica;
        }
    }

    private List<Resultado> obtenerResultados(String jsonResultados){
        List<Resultado> lresultados = new ArrayList<>();

        try{
            JSONArray jobArray = (JSONArray) new JSONParser().parse(jsonResultados);
            for(Object obj: jobArray){
                Resultado resultado = new Resultado();
                JSONObject jobResult = (JSONObject) obj;
                resultado.setNombre(jobResult.get("nombre").toString());
                resultado.setMedicoFirmante(jobResult.get("medico_firmante").toString());
                resultado.setTipoMuestra(jobResult.get("tipo_muestra").toString());
                String archivoString = jobResult.get("archivo").toString();

                //byte[] bytes = Base64.getDecoder().decode(archivoString.substring(14));
                //System.out.println(bytes);
                //resultado.setArchivo(bytes);
                //System.out.println(archivoString);
                resultado.setArchivo(archivoString.getBytes(StandardCharsets.UTF_8));
                //archivoString = archivoString.replaceAll("\\s", "");
                //resultado.setArchivo(Base64.getDecoder().decode(archivoString));

                lresultados.add(resultado);
            }
        }catch (Exception ex){
            // Manejo de excepciones aquí
            ex.printStackTrace();
        }
        return lresultados;
    }
}
