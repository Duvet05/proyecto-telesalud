package com.minsa.sanama.repository.laboratorio;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class OrdenLaboratorioRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public OrdenLaboratorioRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate;}
    private final OrdenLaboratorioMapper ordenLaboratorioMapper = new OrdenLaboratorioMapper();
    private final OrdenLaboratorioUnicaMapper ordenLaboratorioUnicaMapper = new OrdenLaboratorioUnicaMapper();

    public List<OrdenLaboratorio> listarOrdenLaboratorioFiltro(String pv_filtro,String pd_fecha_inicio, String pd_fecha_fin, List<String> estados) {
        if (pd_fecha_inicio != null)pd_fecha_inicio = "'"+pd_fecha_inicio+"'";
        if (pd_fecha_fin != null)pd_fecha_fin = "'"+pd_fecha_fin+"'";
        String procedureCall;
        List<OrdenLaboratorio> ordenLaboratorio= new ArrayList<>();
        List<OrdenLaboratorio> aux=null;
        for (String pn_estado : estados) {
            if (pn_estado != null)pn_estado = "'"+pn_estado+"'";
            procedureCall = "{call dbSanama.ssm_lab_listar_orden_laboratorio_filtro('"+pv_filtro+"',"+pd_fecha_inicio+","+pd_fecha_fin+","+pn_estado+")};";
            aux = jdbcTemplate.query(procedureCall, ordenLaboratorioMapper);
            ordenLaboratorio.addAll(aux);
        }
        return ordenLaboratorio;
    }

    public List<OrdenLaboratorio> buscarOrdenLaboratorio(String pn_id_orden_laboratorio) {
        String procedureCall = "{call dbSanama.ssm_lab_buscar_orden_laboratorio("+pn_id_orden_laboratorio+")};";
        return jdbcTemplate.query(procedureCall, ordenLaboratorioUnicaMapper);
    }

    private static class OrdenLaboratorioMapper implements RowMapper<OrdenLaboratorio> {
        @Override
        public OrdenLaboratorio mapRow(ResultSet rs, int rowNum) throws SQLException {

            OrdenLaboratorio orden = new OrdenLaboratorio();

            orden.setIdOrdenLaboratorio(rs.getInt("id_orden_laboratorio"));
            orden.setCodigoOrden(rs.getString("codigo_orden"));
            orden.setTipoMuestra(rs.getString("tipo_muestra"));
            orden.setInstrucciones(rs.getString("instrucciones"));
            orden.setFechaOrden(rs.getDate("fecha_orden").toLocalDate());
            orden.setHoraOrden(rs.getTime("hora_orden").toLocalTime());
            orden.setEstado(rs.getInt("estado"));

            Paciente paciente = new Paciente();
            paciente.setNombres(rs.getString("nombres_paciente"));
            paciente.setApellidoPaterno(rs.getString("paterno_paciente"));
            paciente.setApellidoMaterno(rs.getString("materno_paciente"));
            paciente.setDni(rs.getString("dni_paciente"));
            paciente.setSexo(rs.getString("sexo_paciente"));
            paciente.setFechaNacimiento(rs.getDate("fecha_nacimiento").toLocalDate());

            Medico medico = new Medico();
            medico.setNombres(rs.getString("nombres_medico"));
            medico.setApellidoPaterno(rs.getString("paterno_medico"));
            medico.setApellidoMaterno(rs.getString("materno_medico"));

            orden.setCitaMedica(new CitaMedica());
            orden.getCitaMedica().setPaciente(paciente);
            orden.getCitaMedica().setMedico(medico);

            return orden;
        }
    }

    private static class OrdenLaboratorioUnicaMapper implements RowMapper<OrdenLaboratorio> {
        @Override
        public OrdenLaboratorio mapRow(ResultSet rs, int rowNum) throws SQLException {

            OrdenLaboratorio orden = new OrdenLaboratorio();

            orden.setCodigoOrden(rs.getString("codigo_orden"));
            orden.setTipoMuestra(rs.getString("tipo_muestra"));
            orden.setInstrucciones(rs.getString("instrucciones"));
            orden.setObservaciones(rs.getString("observaciones"));
            orden.setDoctorFirmante(rs.getString("nombre_doctor_firmante"));

            Paciente paciente = new Paciente();
            paciente.setNombres(rs.getString("nombres_paciente"));
            paciente.setApellidoPaterno(rs.getString("paterno_paciente"));
            paciente.setApellidoMaterno(rs.getString("materno_paciente"));
            paciente.setDni(rs.getString("dni_paciente"));
            paciente.setSexo(rs.getString("sexo_paciente"));
            paciente.setFechaNacimiento(rs.getDate("fecha_nacimiento").toLocalDate());

            Medico medico = new Medico();
            medico.setNombres(rs.getString("nombres_medico"));
            medico.setApellidoPaterno(rs.getString("paterno_medico"));
            medico.setApellidoMaterno(rs.getString("materno_medico"));

            orden.setCitaMedica(new CitaMedica());
            orden.getCitaMedica().setPaciente(paciente);
            orden.getCitaMedica().setMedico(medico);

            return orden;
        }
    }

    public int atenderOrdenLaboratorioV1(OrdenLaboratorio orden) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_lab_atender_orden_laboratorio_v1")
                .declareParameters(new SqlParameter[] {
                        new SqlParameter("pn_id_orden_laboratorio", Types.INTEGER),
                        new SqlParameter("pv_nombre_doctor_firmante", Types.VARCHAR),
                        new SqlParameter("pv_observaciones", Types.VARCHAR),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_orden_laboratorio", orden.getIdOrdenLaboratorio())
                .addValue("pv_nombre_doctor_firmante", orden.getDoctorFirmante())
                .addValue("pv_observaciones", orden.getObservaciones())
                .addValue("pn_estado", orden.getEstado());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if(result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")){
            return -1;
        }
        else return 1;
    }

    public int registrarOrdenLaboratorio(OrdenLaboratorio orden) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_lab_registrar_orden_laboratorio")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_orden_laboratorio", Types.INTEGER),
                        new SqlParameter("pn_id_cita", Types.INTEGER),
                        new SqlParameter("pv_tipo_muestra", Types.VARCHAR),
                        new SqlParameter("pv_instrucciones", Types.VARCHAR)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_cita", orden.getCitaMedica().getIdCita())
                .addValue("pv_tipo_muestra", orden.getTipoMuestra())
                .addValue("pv_instrucciones", orden.getInstrucciones());

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return -1;
        } else {
            int idOrden = (int) result.get("pn_id_orden_laboratorio");
            return idOrden;
        }
    }

    public int actualizarOrdenLaboratorio(OrdenLaboratorio orden) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_lab_actualizar_orden_laboratorio")
                .declareParameters(new SqlParameter[] {
                        new SqlParameter("pn_id_orden_laboratorio", Types.INTEGER),
                        new SqlParameter("pv_codigo_orden", Types.VARCHAR),
                        new SqlParameter("pv_tipo_muestra", Types.VARCHAR),
                        new SqlParameter("pv_instrucciones", Types.VARCHAR),
                        new SqlParameter("pv_nombre_doctor_firmante", Types.VARCHAR),
                        new SqlParameter("pd_fecha_orden", Types.DATE),
                        new SqlParameter("pt_hora_orden", Types.TIME),
                        new SqlParameter("pv_observaciones", Types.VARCHAR)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_orden_laboratorio", orden.getIdOrdenLaboratorio())
                .addValue("pv_codigo_orden", orden.getCodigoOrden())
                .addValue("pv_tipo_muestra", orden.getTipoMuestra())
                .addValue("pv_instrucciones", orden.getInstrucciones())
                .addValue("pv_nombre_doctor_firmante", orden.getDoctorFirmante())
                .addValue("pd_fecha_orden", orden.getFechaOrden())
                .addValue("pt_hora_orden", orden.getHoraOrden())
                .addValue("pv_observaciones", orden.getObservaciones());
        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return -1;
        } else {
            return 1;
        }
    }


}
