package com.minsa.sanama.repository.rrhh;

import com.minsa.sanama.model.rrhh.Administrativo;
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
public class AdministrativoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    private final AdministrativoRepository.AdministrativoMapper administrativoMapper = new AdministrativoRepository.AdministrativoMapper();
    public List<Administrativo> listarAdminsitrativos() {
        String procedureCall = "{call dbSanama.ssm_rrhh_listar_administrativo()}";
        return jdbcTemplate.query(procedureCall, administrativoMapper);
    }

    private static class AdministrativoMapper implements RowMapper<Administrativo> {
        @Override
        public Administrativo mapRow(ResultSet rs, int rowNum) throws SQLException {

            Administrativo administrativo = new Administrativo();

            administrativo.setIdPersona(rs.getInt("id_administrativo"));
            administrativo.setNombres(rs.getString("nombres"));
            administrativo.setApellidoPaterno(rs.getString("apellido_paterno"));
            administrativo.setApellidoMaterno(rs.getString("apellido_materno"));
            administrativo.setDni(rs.getString("dni"));
            administrativo.setFechaNacimiento(rs.getDate("fecha_nacimiento"));
            administrativo.setSexo(rs.getString("sexo"));
            administrativo.setTelefono(rs.getString("telefono"));
            administrativo.setFoto(rs.getBytes("foto"));
            administrativo.setArea(rs.getString("area"));
            administrativo.setCertificacionSistema(rs.getBytes("certificado_sistema"));
            administrativo.setEstado(rs.getInt("estado"));

            return administrativo;
        }

    }

    public int registrarAdministrativo(Administrativo administrativo){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_rrhh_registrar_administrativo")
                .declareParameters(new SqlParameter[]{
                        new SqlOutParameter("pn_id_administrativo", Types.INTEGER),
                        new SqlParameter("pv_nombres ", Types.VARCHAR),
                        new SqlParameter("pv_apellido_paterno", Types.VARCHAR),
                        new SqlParameter("pv_apellido_materno", Types.VARCHAR),
                        new SqlParameter("pv_dni", Types.VARCHAR),
                        new SqlParameter("pd_fecha_nacimiento", Types.DATE),
                        new SqlParameter("pv_sexo", Types.VARCHAR),
                        new SqlParameter("pv_telefono", Types.VARCHAR),
                        new SqlParameter("pv_foto", Types.BLOB),
                        new SqlParameter("pv_area", Types.VARCHAR),
                        new SqlParameter("pv_certificado_sistema", Types.BLOB)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pv_nombres", administrativo.getNombres())
                .addValue("pv_apellido_paterno", administrativo.getApellidoPaterno())
                .addValue("pv_apellido_materno", administrativo.getApellidoMaterno())
                .addValue("pv_dni", administrativo.getDni())
                .addValue("pd_fecha_nacimiento", administrativo.getFechaNacimiento())
                .addValue("pv_sexo", administrativo.getSexo())
                .addValue("pv_telefono", administrativo.getTelefono())
                .addValue("pv_foto", administrativo.getFoto())
                .addValue("pv_area", administrativo.getArea())
                .addValue("pv_certificado_sistema", administrativo.getCertificacionSistema());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else{
            int idAdministrativo = (int)result.get("pn_id_administrativo");
            return idAdministrativo;
        }
    }

    public int actualizarAdministrativo(Administrativo administrativo){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_rrhh_actualizar_administrativo")
                .declareParameters(new SqlParameter[]{
                        new SqlParameter("pn_id_administrativo", Types.INTEGER),
                        new SqlParameter("pv_nombres", Types.VARCHAR),
                        new SqlParameter("pv_apellido_paterno", Types.VARCHAR),
                        new SqlParameter("pv_apellido_materno", Types.VARCHAR),
                        new SqlParameter("pv_dni", Types.VARCHAR),
                        new SqlParameter("pd_fecha_nacimiento", Types.DATE),
                        new SqlParameter("pv_sexo", Types.VARCHAR),
                        new SqlParameter("pv_telefono", Types.VARCHAR),
                        new SqlParameter("pv_foto", Types.BLOB),
                        new SqlParameter("pv_area", Types.VARCHAR),
                        new SqlParameter("pv_certificado_sistema", Types.BLOB)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_administrativo", administrativo.getIdPersona())
                .addValue("pv_nombres", administrativo.getNombres())
                .addValue("pv_apellido_paterno", administrativo.getApellidoPaterno())
                .addValue("pv_apellido_materno", administrativo.getApellidoMaterno())
                .addValue("pv_dni", administrativo.getDni())
                .addValue("pd_fecha_nacimiento", administrativo.getFechaNacimiento())
                .addValue("pv_sexo", administrativo.getSexo())
                .addValue("pv_telefono", administrativo.getTelefono())
                .addValue("pv_foto", administrativo.getFoto())
                .addValue("pv_area", administrativo.getArea())
                .addValue("pv_certificado_sistema", administrativo.getCertificacionSistema());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return 0;
        }
        else return 1;
    }

    public int eliminarAdministrativo(Administrativo administrativo){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_rrhh_eliminar_administrativo")
                .declareParameters(new SqlParameter[]{
                        new SqlParameter("pn_id_administrativo", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_administrativo", administrativo.getIdPersona());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return 0;
        }
        else return 1;
    }

}
