package com.minsa.sanama.repository.atencionmedica;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.model.atencionmedica.OrdenLaboratorio;
import com.minsa.sanama.model.rrhh.Medico;
import com.minsa.sanama.repository.admision.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class OrdenLaboratorioRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public OrdenLaboratorioRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate;}
    private final OrdenLaboratorioMapper ordenLaboratorioMapper = new OrdenLaboratorioMapper();

    public List<CitaMedica> listarOrdenLaboratorioxFiltro(String pv_filtro, String pn_estado, String pd_fecha_inicio, String pd_fecha_fin) {
        if (pn_estado != null)pn_estado = "'"+pn_estado+"'";
        if (pd_fecha_inicio != null)pd_fecha_inicio = "'"+pd_fecha_inicio+"'";
        if (pd_fecha_fin != null)pd_fecha_fin = "'"+pd_fecha_fin+"'";
        String procedureCall = "{call dbSanama.ssm_ate_listar_orden_laboratorio_filtro('"+pv_filtro+"',"+pn_estado+","+pd_fecha_inicio+","+pd_fecha_fin+")};";
        return jdbcTemplate.query(procedureCall, ordenLaboratorioMapper);
    }

    private static class OrdenLaboratorioMapper implements RowMapper<CitaMedica> {
        @Override
        public CitaMedica mapRow(ResultSet rs, int rowNum) throws SQLException {

            CitaMedica citaMedica = new CitaMedica();

            OrdenLaboratorio ordenLaboratorio = new OrdenLaboratorio();
            ordenLaboratorio.setIdOrdenLaboratorio(rs.getInt("id_orden_laboratorio"));
            ordenLaboratorio.setHoraOrden(rs.getTime("hora_orden").toLocalTime());
            ordenLaboratorio.setFechaOrden(rs.getDate("fecha_orden").toLocalDate());
            ordenLaboratorio.setEstado(rs.getInt("estado"));
            citaMedica.setOrdenLaboratorio(ordenLaboratorio);

            Medico medico = new Medico();
            medico.setNombres(rs.getString("nombres_medico"));
            medico.setApellidoPaterno(rs.getString("apellido_paterno_medico"));
            medico.setApellidoMaterno(rs.getString("apellido_materno_medico"));
            citaMedica.setMedico(medico);

            Paciente paciente = new Paciente();
            paciente.setDni(rs.getString("dni"));
            paciente.setNombres(rs.getString("nombres_paciente"));
            paciente.setApellidoPaterno(rs.getString("apellido_paterno_paciente"));
            paciente.setApellidoMaterno(rs.getString("apellido_materno_paciente"));
            citaMedica.setPaciente(paciente);

            citaMedica.setHoraCita(rs.getTime("hora_cita").toLocalTime());
            citaMedica.setFechaCita(rs.getDate("fecha_cita").toLocalDate());

            return citaMedica;
        }
    }

}
