package com.minsa.sanama.repository.rrhh;

import com.minsa.sanama.model.rrhh.Enfermera;
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
public class EnfermeraRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    private final EnfermeraRepository.EnfermeraMapper enfermeraMapper = new EnfermeraRepository.EnfermeraMapper();
    public List<Enfermera> listarEnfermeras() {
        String procedureCall = "{call dbSanama.ssm_rrhh_listar_enfermera()}";
        return jdbcTemplate.query(procedureCall, enfermeraMapper);
    }

    private static class EnfermeraMapper implements RowMapper<Enfermera> {
        @Override
        public Enfermera mapRow(ResultSet rs, int rowNum) throws SQLException {

            Enfermera enfermera = new Enfermera();

            enfermera.setIdPersona(rs.getInt("id_enfermera"));
            enfermera.setNombres(rs.getString("nombres"));
            enfermera.setApellidoPaterno(rs.getString("apellido_paterno"));
            enfermera.setApellidoMaterno(rs.getString("apellido_materno"));
            enfermera.setDni(rs.getString("dni"));
            enfermera.setFechaNacimiento(rs.getDate("fecha_nacimiento").toLocalDate());
            enfermera.setSexo(rs.getString("sexo"));
            enfermera.setTelefono(rs.getString("telefono"));
            enfermera.setFoto(rs.getBytes("foto"));
            enfermera.setArea(rs.getString("area"));
            enfermera.setNumeroLicencia(rs.getString("numeroLicencia"));
            enfermera.setEstado(rs.getInt("estado"));

            return enfermera;
        }

    }

    public int registrarEnfermera(Enfermera enfermera){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_rrhh_registrar_enfermera")
                .declareParameters(new SqlParameter[]{
                        new SqlOutParameter("pn_id_enfermera", Types.INTEGER),
                        new SqlParameter("pv_nombres ", Types.VARCHAR),
                        new SqlParameter("pv_apellido_paterno", Types.VARCHAR),
                        new SqlParameter("pv_apellido_materno", Types.VARCHAR),
                        new SqlParameter("pv_dni", Types.VARCHAR),
                        new SqlParameter("pd_fecha_nacimiento", Types.DATE),
                        new SqlParameter("pv_sexo", Types.VARCHAR),
                        new SqlParameter("pv_telefono", Types.VARCHAR),
                        new SqlParameter("pv_foto", Types.BLOB),
                        new SqlParameter("pv_area", Types.VARCHAR),
                        new SqlParameter("pv_numeroLicencia", Types.VARCHAR)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pv_nombres", enfermera.getNombres())
                .addValue("pv_apellido_paterno", enfermera.getApellidoPaterno())
                .addValue("pv_apellido_materno", enfermera.getApellidoMaterno())
                .addValue("pv_dni", enfermera.getDni())
                .addValue("pd_fecha_nacimiento", enfermera.getFechaNacimiento())
                .addValue("pv_sexo", enfermera.getSexo())
                .addValue("pv_telefono", enfermera.getTelefono())
                .addValue("pv_foto", enfermera.getFoto())
                .addValue("pv_area", enfermera.getArea())
                .addValue("pv_numeroLicencia", enfermera.getNumeroLicencia());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            int idEnfermera = (int)result.get("pn_id_enfermera");
            return idEnfermera;
        }
    }

    public int actualizarEnfermera(Enfermera enfermera){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_rrhh_actualizar_enfermera")
                .declareParameters(new SqlParameter[]{
                        new SqlParameter("pn_id_enfermera", Types.INTEGER),
                        new SqlParameter("pv_nombres", Types.VARCHAR),
                        new SqlParameter("pv_apellido_paterno", Types.VARCHAR),
                        new SqlParameter("pv_apellido_materno", Types.VARCHAR),
                        new SqlParameter("pv_dni", Types.VARCHAR),
                        new SqlParameter("pd_fecha_nacimiento", Types.DATE),
                        new SqlParameter("pv_sexo", Types.VARCHAR),
                        new SqlParameter("pv_telefono", Types.VARCHAR),
                        new SqlParameter("pv_foto", Types.BLOB),
                        new SqlParameter("pv_area", Types.VARCHAR),
                        new SqlParameter("pv_numeroLicencia", Types.VARCHAR)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_enfermera", enfermera.getIdPersona())
                .addValue("pv_nombres", enfermera.getNombres())
                .addValue("pv_apellido_paterno", enfermera.getApellidoPaterno())
                .addValue("pv_apellido_materno", enfermera.getApellidoMaterno())
                .addValue("pv_dni", enfermera.getDni())
                .addValue("pd_fecha_nacimiento", enfermera.getFechaNacimiento())
                .addValue("pv_sexo", enfermera.getSexo())
                .addValue("pv_telefono", enfermera.getTelefono())
                .addValue("pv_foto", enfermera.getFoto())
                .addValue("pv_area", enfermera.getArea())
                .addValue("pv_numeroLicencia", enfermera.getNumeroLicencia());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return 0;
        }
        else return 1;
    }

    public int eliminarEnfermera(Enfermera enfermera){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_rrhh_eliminar_enfermera")
                .declareParameters(new SqlParameter[]{
                        new SqlParameter("pn_id_enfermera", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_enfermera", enfermera.getIdPersona());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return 0;
        }
        else return 1;
    }

}
