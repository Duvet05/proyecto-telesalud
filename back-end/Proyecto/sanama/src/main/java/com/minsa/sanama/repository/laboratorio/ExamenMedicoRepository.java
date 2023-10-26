package com.minsa.sanama.repository.laboratorio;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.model.laboratorio.ExamenMedico;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.model.rrhh.Especialidad;
import com.minsa.sanama.model.rrhh.Medico;
import com.minsa.sanama.model.rrhh.TurnoAtencion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public class ExamenMedicoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
    public ExamenMedicoRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate;}

    private final ExamenMedicoRepository.ExamenMedicoMapper examenMedicoMapper = new ExamenMedicoRepository.ExamenMedicoMapper();

    public List<ExamenMedico> listarExamenMedicoID(String pv_filtro) {
        String procedureCall = "{call dbSanama.ssm_lab_listar_examen_medico('"+pv_filtro+"')};";
        return jdbcTemplate.query(procedureCall, examenMedicoMapper);
    }

    public int registrarExamenMedico(ExamenMedico examenMedico) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_lab_registrar_examen_medico")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_examen", Types.INTEGER),
                        new SqlParameter("pn_id_cita", Types.INTEGER),
                        new SqlParameter("pn_id_orden_laboratorio", Types.INTEGER),
                        new SqlParameter("pv_nombre_doctor_firmante", Types.VARCHAR),
                        new SqlParameter("pv_tipo", Types.VARCHAR),
                        new SqlParameter("pv_observaciones", Types.VARCHAR),
                        new SqlParameter("pv_archivo", Types.BLOB),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_cita", examenMedico.getOrdenLaboratorio().getCitaMedica().getIdCita())
                .addValue("pn_id_orden_laboratorio", examenMedico.getOrdenLaboratorio().getIdOrdenLaboratorio())
                .addValue("pv_nombre_doctor_firmante", examenMedico.getNombre())
                .addValue("pv_tipo", examenMedico.getTipo())
                .addValue("pv_observaciones", examenMedico.getObservaciones())
                .addValue("pv_archivo", examenMedico.getArchivo())
                .addValue("pn_estado", 1);

        Map<String, Object> result = simpleJdbcCall.execute(mapSqlParameterSource);
        if (result.containsKey("ERROR_CODE") || result.containsKey("ERROR_MESSAGE")) {
            return -1;
        } else {
            int idExamenMedico = (int) result.get("pn_id_examen");
            return idExamenMedico;
        }
    }

    private static class ExamenMedicoMapper implements RowMapper<ExamenMedico> {
        @Override
        public ExamenMedico mapRow(ResultSet rs, int rowNum) throws SQLException {

            ExamenMedico examen = new ExamenMedico();

            Paciente paciente = new Paciente();

            paciente.setNombres(rs.getString("nombres_paciente"));
            paciente.setApellidoPaterno(rs.getString("apellido_paterno_paciente"));
            paciente.setApellidoMaterno(rs.getString("apellido_materno_paciente"));
            paciente.setDni(rs.getString("dni"));

            Medico medico = new Medico();
            medico.setNombres(rs.getString("nombres_medico"));
            medico.setApellidoPaterno(rs.getString("apellido_paterno_medico"));
            medico.setApellidoMaterno(rs.getString("apellido_materno_medico"));

            examen.setIdExamen(rs.getInt("id_examen"));
            OrdenLaboratorio orden = new OrdenLaboratorio();
            CitaMedica cm = new CitaMedica();
            cm.setMedico(medico);
            cm.setPaciente(paciente);
            cm.setIdCita(rs.getInt("id_cita"));
            orden.setCitaMedica(cm);
            orden.setIdOrdenLaboratorio(rs.getInt("id_orden_laboratorio"));
            examen.setOrdenLaboratorio(orden);
            examen.setNombre(rs.getString("nombre_doctor_firmante"));
            examen.setTipo(rs.getString("tipo"));
            examen.setObservaciones(rs.getString("observaciones"));
            examen.setArchivo(rs.getBytes("archivo"));
            examen.setEstado(rs.getInt("estado"));

            return examen;
        }
    }
}
