package com.minsa.sanama.repository.laboratorio;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.model.laboratorio.ExamenMedico;
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
import java.util.List;
import java.util.Map;

@Repository
public class ExamenMedicoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public ExamenMedicoRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate;}

    private final ExamenMedicoRepository.ExamenMedicoMapper examenMedicoMapper = new ExamenMedicoRepository.ExamenMedicoMapper();

    public List<ExamenMedico> buscarExamenMedicoID(String pn_id_orden) {
        String procedureCall = "{call dbSanama.ssm_lab_buscar_examen_medico('"+pn_id_orden+"')};";
        return jdbcTemplate.query(procedureCall, examenMedicoMapper);
    }

    public int registrarExamenMedico(ExamenMedico examenMedico) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("dbSanama")
                .withProcedureName("ssm_lab_registrar_examen_medico")
                .declareParameters(new SqlParameter[] {
                        new SqlOutParameter("pn_id_examen", Types.INTEGER),
                        new SqlParameter("pn_id_orden_laboratorio", Types.INTEGER),
                        new SqlParameter("pv_nombre_doctor_firmante", Types.VARCHAR),
                        new SqlParameter("pv_nombre_archivo", Types.VARCHAR),
                        new SqlParameter("pv_tipo", Types.VARCHAR),
                        new SqlParameter("pv_observaciones", Types.VARCHAR),
                        new SqlParameter("pv_archivo", Types.BLOB),
                        new SqlParameter("pn_estado", Types.INTEGER)
                });
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        mapSqlParameterSource
                .addValue("pn_id_orden_laboratorio", examenMedico.getOrdenLaboratorio().getIdOrdenLaboratorio())
                .addValue("pv_nombre_doctor_firmante", examenMedico.getDoctorFirmante())
                .addValue("pv_nombre_archivo", examenMedico.getNombre())
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

            examen.setIdExamen(rs.getInt("id_examen"));
            examen.setNombre(rs.getString("nombre_doctor_firmante"));
            examen.setTipo(rs.getString("tipo_examen"));
            examen.setObservaciones(rs.getString("observaciones"));
            examen.setArchivo(rs.getBytes("archivo"));

            Paciente paciente = new Paciente();
            paciente.setDni(rs.getString("dni_paciente"));
            paciente.setNombres(rs.getString("nombres_paciente"));
            paciente.setApellidoPaterno(rs.getString("apellido_paterno_paciente"));
            paciente.setApellidoMaterno(rs.getString("apellido_materno_paciente"));

            Medico medico = new Medico();
            medico.setNombres(rs.getString("nombres_medico"));
            medico.setApellidoPaterno(rs.getString("apellido_paterno_medico"));
            medico.setApellidoMaterno(rs.getString("apellido_materno_medico"));

            OrdenLaboratorio orden = new OrdenLaboratorio();
            CitaMedica citaMedica = new CitaMedica();
            citaMedica.setMedico(medico);
            citaMedica.setPaciente(paciente);
            orden.setCitaMedica(citaMedica);
            orden.setIdOrdenLaboratorio(rs.getInt("id_orden_laboratorio"));
            orden.setInstrucciones(rs.getString("instrucciones"));
            examen.setOrdenLaboratorio(orden);

            return examen;
        }
    }
}
