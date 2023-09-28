package com.minsa.sanama.repository.rrhh;

import com.minsa.sanama.model.rrhh.Especialidad;
import com.minsa.sanama.model.rrhh.Medico;
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
public class MedicoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    private final MedicoRepository.MedicoMapper medicoMapper = new MedicoRepository.MedicoMapper();
    public List<Medico> listarMedicos() {
        String procedureCall = "{call dbSanama.ssm_rrhh_listar_medico()}";
        return jdbcTemplate.query(procedureCall, medicoMapper);
    }

    private static class MedicoMapper implements RowMapper<Medico> {
        @Override
        public Medico mapRow(ResultSet rs, int rowNum) throws SQLException {

            Medico medico = new Medico();
            medico.setEspecialidad(new Especialidad());

            medico.setIdPersona(rs.getInt("id_medico"));
            medico.getEspecialidad().setIdEspecialidad(rs.getInt("id_especialidad"));
            medico.setNombres(rs.getString("nombres"));
            medico.setApellidoPaterno(rs.getString("apellido_paterno"));
            medico.setApellidoMaterno(rs.getString("apellido_materno"));
            medico.setDni(rs.getString("dni"));
            medico.setFechaNacimiento(rs.getDate("fecha_nacimiento"));
            medico.setSexo(rs.getString("sexo"));
            medico.setTelefono(rs.getString("telefono"));
            medico.setFoto(rs.getBytes("foto"));
            medico.setArea(rs.getString("area"));
            medico.setCmp(rs.getString("cmp"));
            medico.setEstado(rs.getInt("estado"));

            return medico;
        }

    }

    public int registrarMedico(Medico medico){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_rrhh_registrar_medico")
                .declareParameters(new SqlParameter[]{
                        new SqlOutParameter("pn_id_medico", Types.INTEGER),
                        new SqlParameter("pn_id_especialidad", Types.INTEGER),
                        new SqlParameter("pv_nombres", Types.VARCHAR),
                        new SqlParameter("pv_apellido_paterno", Types.VARCHAR),
                        new SqlParameter("pv_apellido_materno", Types.VARCHAR),
                        new SqlParameter("pv_dni", Types.VARCHAR),
                        new SqlParameter("pd_fecha_nacimiento", Types.DATE),
                        new SqlParameter("pv_sexo", Types.VARCHAR),
                        new SqlParameter("pv_telefono", Types.VARCHAR),
                        new SqlParameter("pb_foto", Types.BLOB),
                        new SqlParameter("pv_area", Types.VARCHAR),
                        new SqlParameter("pv_cmp", Types.VARCHAR),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_especialidad", medico.getEspecialidad().getIdEspecialidad())
                .addValue("pv_nombres", medico.getNombres())
                .addValue("pv_apellido_paterno", medico.getApellidoPaterno())
                .addValue("pv_apellido_materno", medico.getApellidoMaterno())
                .addValue("pv_dni", medico.getDni())
                .addValue("pd_fecha_nacimiento", medico.getFechaNacimiento())
                .addValue("pv_sexo", medico.getSexo())
                .addValue("pv_telefono", medico.getTelefono())
                .addValue("pv_foto", medico.getFoto())
                .addValue("pv_area", medico.getArea())
                .addValue("pv_cmp", medico.getCmp())
                .addValue("pn_estado", 1);

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            int idMedico = (int)result.get("pn_id_medico");
            return idMedico;
        }
    }

    public int actualizarMedico(Medico medico){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_rrhh_actualizar_medico")
                .declareParameters(new SqlParameter[]{
                        new SqlParameter("pn_id_medico", Types.INTEGER),
                        new SqlParameter("pn_id_especialidad", Types.INTEGER),
                        new SqlParameter("pv_nombres", Types.VARCHAR),
                        new SqlParameter("pv_apellido_paterno", Types.VARCHAR),
                        new SqlParameter("pv_apellido_materno", Types.VARCHAR),
                        new SqlParameter("pv_dni", Types.VARCHAR),
                        new SqlParameter("pd_fecha_nacimiento", Types.DATE),
                        new SqlParameter("pv_sexo", Types.VARCHAR),
                        new SqlParameter("pv_telefono", Types.VARCHAR),
                        new SqlParameter("pb_foto", Types.BLOB),
                        new SqlParameter("pv_area", Types.VARCHAR),
                        new SqlParameter("pv_cmp", Types.VARCHAR),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_medico", medico.getIdPersona())
                .addValue("pn_id_especialidad", medico.getEspecialidad().getIdEspecialidad())
                .addValue("pv_nombres", medico.getNombres())
                .addValue("pv_apellido_paterno", medico.getApellidoPaterno())
                .addValue("pv_apellido_materno", medico.getApellidoMaterno())
                .addValue("pv_dni", medico.getDni())
                .addValue("pd_fecha_nacimiento", medico.getFechaNacimiento())
                .addValue("pv_sexo", medico.getSexo())
                .addValue("pv_telefono", medico.getTelefono())
                .addValue("pv_foto", medico.getFoto())
                .addValue("pv_area", medico.getArea())
                .addValue("pv_cmp", medico.getCmp())
                .addValue("pn_estado", 1);

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return 0;
        }
        else return 1;
    }

    public int eliminarMedico(Medico medico){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_rrhh_eliminar_medico")
                .declareParameters(new SqlParameter[]{
                        new SqlParameter("pn_id_medico", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_medico", medico.getIdPersona());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return 0;
        }
        else return 1;
    }

}
