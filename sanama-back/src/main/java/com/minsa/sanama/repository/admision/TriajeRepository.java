package com.minsa.sanama.repository.admision;

import com.minsa.sanama.model.admision.Triaje;
import com.minsa.sanama.model.admision.Paciente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class TriajeRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    public TriajeRepository(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

    private final TriajeMapper triajeMapper = new TriajeMapper();
    private final TriajeListarMapper triajeListarMapper = new TriajeListarMapper();

    public List<Triaje> listarTriajePorFiltro(String pv_filtro,String pd_fecha_inicio,String pd_fecha_fin,List<String> estados) {
        if (pd_fecha_inicio != null)pd_fecha_inicio = "'"+pd_fecha_inicio+"'";
        if (pd_fecha_fin != null)pd_fecha_fin = "'"+pd_fecha_fin+"'";
        String procedureCall;
        List<Triaje> triaje= new ArrayList<>();
        List<Triaje> aux=null;
        for (String pn_estado : estados) {
            if (pn_estado != null)pn_estado = "'"+pn_estado+"'";
            procedureCall = "{call dbSanama.ssm_adm_listar_triaje_por_filtro('"+pv_filtro+"',"+pd_fecha_inicio+","+pd_fecha_fin+","+pn_estado+")};";
            aux = jdbcTemplate.query(procedureCall, triajeListarMapper);
            triaje.addAll(aux);
        }
        return triaje;
    }

    public List<Triaje> buscarTriaje(String pv_filtro) {
        String procedureCall = "{call dbSanama.ssm_adm_buscar_triaje('" + pv_filtro + "')};";
        return jdbcTemplate.query(procedureCall, triajeMapper);
    }

    public int actualizarTriaje(Triaje triaje) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_adm_actualizar_triaje")
                .declareParameters(
                        new SqlParameter("pn_id_triaje", Types.INTEGER),
                        new SqlParameter("pn_peso", Types.INTEGER),
                        new SqlParameter("pn_talla", Types.INTEGER),
                        new SqlParameter("pn_temperatura", Types.INTEGER),
                        new SqlParameter("pv_motivo_visita", Types.VARCHAR),
                        new SqlParameter("pv_presion_sistolica", Types.VARCHAR),
                        new SqlParameter("pv_presion_diastolica", Types.VARCHAR),
                        new SqlParameter("pv_condicionesPrexistentes", Types.VARCHAR),
                        new SqlParameter("pv_prioridad", Types.VARCHAR),
                        new SqlParameter("pn_estado", Types.INTEGER),
                        new SqlParameter("pn_saturacionOxigeno", Types.INTEGER),
                        new SqlParameter("pn_frecuenciaCardiaca", Types.INTEGER),
                        new SqlParameter("pn_frecuenciaRespiratoria", Types.INTEGER),
                        new SqlParameter("pn_glasgow", Types.VARCHAR),
                        new SqlParameter("pn_eyes_open", Types.VARCHAR),
                        new SqlParameter("pn_talking_correctly", Types.VARCHAR),
                        new SqlParameter("pn_able_to_move_body", Types.VARCHAR),
                        new SqlParameter("pv_nivelConciencia", Types.VARCHAR),
                        new SqlParameter("pv_nivelDolor", Types.VARCHAR)
                );
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_triaje", triaje.getIdTriaje())
                .addValue("pn_peso", triaje.getPeso())
                .addValue("pn_talla", triaje.getTalla())
                .addValue("pn_temperatura", triaje.getTemperatura())
                .addValue("pv_motivo_visita", triaje.getMotivoVisita())
                .addValue("pv_presion_sistolica", triaje.getPresionSistolica())
                .addValue("pv_presion_diastolica", triaje.getPresionDiastolica())
                .addValue("pv_condicionesPrexistentes", triaje.getCondicionesPrexistentes())
                .addValue("pv_prioridad", triaje.getPrioridad())
                .addValue("pn_estado", triaje.getEstado())
                .addValue("pn_saturacionOxigeno", triaje.getSaturacionOxigeno())
                .addValue("pn_frecuenciaCardiaca", triaje.getFrecuenciaCardiaca())
                .addValue("pn_frecuenciaRespiratoria", triaje.getFrecuenciaRespiratoria())
                .addValue("pn_glasgow", triaje.getGlasgow())
                .addValue("pn_eyes_open", triaje.getEyesOpen())
                .addValue("pn_talking_correctly", triaje.getTalkingCorrectly())
                .addValue("pn_able_to_move_body", triaje.getAbleToMoveBody())
                .addValue("pv_nivelConciencia", triaje.getNivelConciencia())
                .addValue("pv_nivelDolor", triaje.getNivelDolor());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);

        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return -1;
        } else {
            return 1;
        }
    }

    public int eliminarTriaje(Triaje triaje) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_adm_eliminar_triaje")
                .declareParameters(
                        new SqlParameter("pn_id_triaje", Types.INTEGER),
                        new SqlParameter("pn_peso", Types.INTEGER),
                        new SqlParameter("pn_talla", Types.INTEGER),
                        new SqlParameter("pn_temperatura", Types.INTEGER),
                        new SqlParameter("pv_motivo_visita", Types.VARCHAR),
                        new SqlParameter("pv_presion_sistolica", Types.VARCHAR),
                        new SqlParameter("pv_presion_diastolica", Types.VARCHAR),
                        new SqlParameter("pv_condicionesPrexistentes", Types.VARCHAR),
                        new SqlParameter("pv_prioridad", Types.VARCHAR),
                        new SqlParameter("pn_estado", Types.INTEGER),
                        new SqlParameter("pn_saturacionOxigeno", Types.INTEGER),
                        new SqlParameter("pn_frecuenciaCardiaca", Types.INTEGER),
                        new SqlParameter("pn_frecuenciaRespiratoria", Types.INTEGER),
                        new SqlParameter("pn_glasgow", Types.VARCHAR),
                        new SqlParameter("pn_eyes_open", Types.VARCHAR),
                        new SqlParameter("pn_talking_correctly", Types.VARCHAR),
                        new SqlParameter("pn_able_to_move_body", Types.VARCHAR),
                        new SqlParameter("pv_nivelConciencia", Types.VARCHAR),
                        new SqlParameter("pv_nivelDolor", Types.VARCHAR)
                );
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_triaje", triaje.getIdTriaje())
                .addValue("pn_peso", triaje.getPeso())
                .addValue("pn_talla", triaje.getTalla())
                .addValue("pn_temperatura", triaje.getTemperatura())
                .addValue("pv_motivo_visita", triaje.getMotivoVisita())
                .addValue("pv_presion_sistolica", triaje.getPresionSistolica())
                .addValue("pv_presion_diastolica", triaje.getPresionDiastolica())
                .addValue("pv_condicionesPrexistentes", triaje.getCondicionesPrexistentes())
                .addValue("pv_prioridad", triaje.getPrioridad())
                .addValue("pn_estado", triaje.getEstado())
                .addValue("pn_saturacionOxigeno", triaje.getSaturacionOxigeno())
                .addValue("pn_frecuenciaCardiaca", triaje.getFrecuenciaCardiaca())
                .addValue("pn_frecuenciaRespiratoria", triaje.getFrecuenciaRespiratoria())
                .addValue("pn_glasgow", triaje.getGlasgow())
                .addValue("pn_eyes_open", triaje.getEyesOpen())
                .addValue("pn_talking_correctly", triaje.getTalkingCorrectly())
                .addValue("pn_able_to_move_body", triaje.getAbleToMoveBody())
                .addValue("pv_nivelConciencia", triaje.getNivelConciencia())
                .addValue("pv_nivelDolor", triaje.getNivelDolor());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);

        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return -1;
        } else {
            return 1;
        }
    }

    private static class TriajeMapper implements RowMapper<Triaje> {
        @Override
        public Triaje mapRow(ResultSet rs, int rowNum) throws SQLException {

            Triaje triaje = new Triaje();
            // Mapea los campos de Triaje
            triaje.setIdTriaje(rs.getInt("id_triaje"));
            triaje.setCodigoTriaje(rs.getString("codigo_triaje"));
            triaje.setPeso(rs.getInt("peso"));
            triaje.setTalla(rs.getInt("talla"));
            triaje.setTemperatura(rs.getInt("temperatura"));
            triaje.setMotivoVisita(rs.getString("motivo_visita"));
            triaje.setPresionSistolica(rs.getString("presion_sistolica"));
            triaje.setPresionDiastolica(rs.getString("presion_diastolica"));
            triaje.setPresionArterial(rs.getInt("presion_arterial"));           //Eliminar
            triaje.setPrioridad(rs.getString("prioridad"));
            triaje.setEstado(rs.getInt("estado"));
            triaje.setFechaTriaje(rs.getDate("fecha").toLocalDate());
            triaje.setHoraTriaje(rs.getTime("hora").toLocalTime());
            triaje.setSaturacionOxigeno(rs.getString("saturacionOxigeno"));
            triaje.setFrecuenciaCardiaca(rs.getString("frecuenciaCardiaca"));
            triaje.setFrecuenciaRespiratoria(rs.getString("frecuenciaRespiratoria"));
            triaje.setGlasgow(rs.getString("glasgow"));
            triaje.setAbleToMoveBody(rs.getString("able_to_move_body"));
            triaje.setTalkingCorrectly(rs.getString("talking_correctly"));
            triaje.setEyesOpen(rs.getString("eyes_open"));
            triaje.setNivelConciencia(rs.getString("nivelConciencia"));
            triaje.setNivelDolor(rs.getString("nivelDolor"));
            triaje.setCondicionesPrexistentes(rs.getString("condicionesPrexistentes"));

            // Mapea Paciente
            Paciente paciente = new Paciente();
            paciente.setNombres(rs.getString("paciente_nombres"));
            paciente.setApellidoPaterno(rs.getString("paciente_apellido_paterno"));
            paciente.setApellidoMaterno(rs.getString("paciente_apellido_materno"));
            paciente.setDni(rs.getString("paciente_dni"));
            paciente.setFechaNacimiento(rs.getDate("paciente_fecha_nacimiento").toLocalDate());
            paciente.setSexo(rs.getString("paciente_sexo"));

            triaje.setPaciente(paciente);
            return triaje;
        }
    }

    private static class TriajeListarMapper implements RowMapper<Triaje> {
        @Override
        public Triaje mapRow(ResultSet rs, int rowNum) throws SQLException {

            Triaje triaje = new Triaje();
            // Mapea los campos de Triaje
            triaje.setIdTriaje(rs.getInt("id_triaje"));
            triaje.setCodigoTriaje(rs.getString("codigo_triaje"));
            triaje.setEstado(rs.getInt("estado"));
            triaje.setFechaTriaje(rs.getDate("fecha").toLocalDate());
            triaje.setHoraTriaje(rs.getTime("hora").toLocalTime());
            triaje.setPrioridad(rs.getString("prioridad"));

            // Mapea Paciente
            Paciente paciente = new Paciente();
            paciente.setNombres(rs.getString("paciente_nombres"));
            paciente.setApellidoPaterno(rs.getString("paciente_apellido_paterno"));
            paciente.setApellidoMaterno(rs.getString("paciente_apellido_materno"));
            paciente.setDni(rs.getString("paciente_dni"));

            triaje.setPaciente(paciente);
            return triaje;
        }
    }
}