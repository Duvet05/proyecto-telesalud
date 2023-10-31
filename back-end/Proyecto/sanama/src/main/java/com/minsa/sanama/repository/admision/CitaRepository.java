package com.minsa.sanama.repository.admision;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.model.atencionmedica.HojaMedica;
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
public class CitaRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public CitaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final CitaMedicaMapper citaMedicaMapper = new CitaMedicaMapper();
    private final CitaMedicaMedicoMapper citaMedicaMedicoMapper = new CitaMedicaMedicoMapper();
    private final CitaMedicaPacienteMapper citaMedicaPacienteMapper = new CitaMedicaPacienteMapper();
    public List<CitaMedica> listarCitasTodas() {
        String procedureCall = "{call dbSanama.ssm_adm_listar_citas_medicas()};";
        return jdbcTemplate.query(procedureCall, citaMedicaMapper);
    }

    public List<CitaMedica> listarCitasxPaciente(int pn_idPaciente) {
        String procedureCall = "{call dbSanama.ssm_adm_listar_citas_medicas_x_paciente('" + pn_idPaciente + "')};";
        return jdbcTemplate.query(procedureCall, citaMedicaPacienteMapper);
    }

    public List<CitaMedica> listarCitasxFiltro(String pn_id_especialidad, String pv_filtro, String pd_fecha_inicio, String pd_fecha_fin, String pn_estado) {
        if (pd_fecha_inicio != null)pd_fecha_inicio = "'"+pd_fecha_inicio+"'";
        if (pd_fecha_fin != null)pd_fecha_fin = "'"+pd_fecha_fin+"'";
        if (pn_estado != null)pn_estado = "'"+pn_estado+"'";
        String procedureCall = "{call dbSanama.ssm_adm_listar_citas_medicas_filtro("+pn_id_especialidad+",'"+pv_filtro+"',"+pd_fecha_inicio+","+pd_fecha_fin+","+pn_estado+")};";
        return jdbcTemplate.query(procedureCall, citaMedicaMapper);
    }

    public List<CitaMedica> listarCitasxMedico(String pn_id_medico, String pn_estado) {
        if (pn_estado != null)pn_estado = "'"+pn_estado+"'";
        String procedureCall = "{call dbSanama.ssm_adm_listar_citas_medicas_x_medico("+pn_id_medico+","+pn_estado+")};";
        return jdbcTemplate.query(procedureCall, citaMedicaMedicoMapper);
    }

    private static class CitaMedicaMapper implements RowMapper<CitaMedica> {
        @Override
        public CitaMedica mapRow(ResultSet rs, int rowNum) throws SQLException {

            CitaMedica citaMedica = new CitaMedica();
            citaMedica.setIdCita(rs.getInt("id_cita"));
            citaMedica.setCodigoCita(rs.getString("codigo_cita_medica"));
            citaMedica.setFechaCita(rs.getDate("fecha_cita").toLocalDate());
            citaMedica.setHoraCita(rs.getTime("hora_cita").toLocalTime());
            citaMedica.setEstado(rs.getInt("estado"));

            Paciente paciente = new Paciente();
            paciente.setNombres(rs.getString("nombres_paciente"));
            paciente.setApellidoPaterno(rs.getString("apellido_paterno_paciente"));
            paciente.setApellidoMaterno(rs.getString("apellido_materno_paciente"));
            paciente.setDni(rs.getString("dni_paciente"));

            Medico medico = new Medico();
            medico.setNombres(rs.getString("nombres_medico"));
            medico.setApellidoPaterno(rs.getString("apellido_paterno_medico"));
            medico.setApellidoMaterno(rs.getString("apellido_materno_medico"));

            Especialidad especialidad = new Especialidad();
            especialidad.setNombre(rs.getString("nombre_especialidad"));
            medico.setEspecialidad(especialidad);

            citaMedica.setMedico(medico);
            citaMedica.setPaciente(paciente);

            return citaMedica;
        }
    }

    private static class CitaMedicaMedicoMapper implements RowMapper<CitaMedica> {
        @Override
        public CitaMedica mapRow(ResultSet rs, int rowNum) throws SQLException {

            CitaMedica citaMedica = new CitaMedica();

            citaMedica.setIdCita(rs.getInt("id_cita"));
            citaMedica.setTipoCita(rs.getString("tipo_cita"));
            citaMedica.setCodigoCita(rs.getString("codigo_cita_medica"));

            Paciente paciente = new Paciente();
            paciente.setNombres(rs.getString("nombres_paciente"));
            paciente.setApellidoPaterno(rs.getString("apellido_paterno_paciente"));
            paciente.setApellidoMaterno(rs.getString("apellido_materno_paciente"));

            citaMedica.setPaciente(paciente);
            citaMedica.setHoraCita(rs.getTime("hora_cita").toLocalTime());
            citaMedica.setFechaCita(rs.getDate("fecha_cita").toLocalDate());
            citaMedica.setEstado(rs.getInt("estado"));

            return citaMedica;
        }
    }

    private static class CitaMedicaPacienteMapper implements RowMapper<CitaMedica> {
        @Override
        public CitaMedica mapRow(ResultSet rs, int rowNum) throws SQLException {

            CitaMedica citaMedica = new CitaMedica();

            citaMedica.setIdCita(rs.getInt("id_cita"));
            citaMedica.setCodigoCita(rs.getString("codigo_cita_medica"));
            Medico medico = new Medico();
            medico.setNombres(rs.getString("nombres_medico"));
            medico.setApellidoPaterno(rs.getString("apellido_paterno_medico"));
            medico.setApellidoMaterno(rs.getString("apellido_materno_medico"));
            Especialidad especialidad = new Especialidad();
            especialidad.setNombre(rs.getString("nombre_especialidad"));
            medico.setEspecialidad(especialidad);
            citaMedica.setMedico(medico);
            HojaMedica hoja = new HojaMedica();
            hoja.setIdHojaClinica(rs.getInt("id_hoja_medica"));
            citaMedica.setHojaMedica(hoja);
            citaMedica.setFechaCita(rs.getDate("fecha_cita").toLocalDate());
            citaMedica.setHoraCita(rs.getTime("hora_cita").toLocalTime());
            citaMedica.setEstado(rs.getInt("estado"));

            return citaMedica;
        }
    }

    /* Este es el metodo para registrar una Cita Medica */
    public int registrarCita(CitaMedica citaMedica) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_adm_registrar_cita_medica")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_cita", Types.INTEGER),
                        new SqlParameter("pn_id_paciente", Types.INTEGER),
                        new SqlParameter("pn_id_medico", Types.INTEGER),
                        new SqlParameter("pv_codigo_cita_medica", Types.VARCHAR),
                        new SqlParameter("pv_tipo_cita", Types.VARCHAR),
                        new SqlParameter("pt_hora_cita", Types.TIME),
                        new SqlParameter("pd_fecha_cita", Types.DATE),
                        new SqlParameter("pn_requiere_triaje", Types.INTEGER),
                        new SqlParameter("pb_tiene_acompanhante", Types.BOOLEAN),
                        new SqlParameter("pv_nombre_acompanhante", Types.VARCHAR),
                        new SqlParameter("pv_dni_acompanhante", Types.VARCHAR),
                        new SqlParameter("pv_parentezco", Types.VARCHAR),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_paciente", citaMedica.getPaciente().getIdPersona())
                .addValue("pn_id_medico", citaMedica.getMedico().getIdPersona())
                .addValue("pv_codigo_cita_medica", citaMedica.getCodigoCitaMedica())
                .addValue("pv_tipo_cita", citaMedica.getTipoCita())
                .addValue("pt_hora_cita", citaMedica.getHoraCita())
                .addValue("pd_fecha_cita", citaMedica.getFechaCita())
                .addValue("pn_requiere_triaje", citaMedica.getRequiereTriaje())
                .addValue("pb_tiene_acompanhante", citaMedica.isTieneAcompanhante())
                .addValue("pv_nombre_acompanhante", citaMedica.getNombreAcompanhante())
                .addValue("pv_dni_acompanhante", citaMedica.getDniAcompanhante())
                .addValue("pv_parentezco", citaMedica.getParentezco())
                .addValue("pn_estado", 1);

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return -1;
        } else {
            int idCita = (int) result.get("pn_id_cita");
            return idCita;
        }
    }

}
