package com.minsa.sanama.repository.laboratorio;

import com.minsa.sanama.model.admision.Paciente;
import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.model.rrhh.Medico;
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
    private final OrdenLaboratorioUnicaMapper ordenLaboratorioUnicaMapper = new OrdenLaboratorioUnicaMapper();

    public List<OrdenLaboratorio> listarOrdenLaboratorioFiltro(String pv_filtro,String pd_fecha_inicio, String pd_fecha_fin) {
        if (pd_fecha_inicio != null)pd_fecha_inicio = "'"+pd_fecha_inicio+"'";
        if (pd_fecha_fin != null)pd_fecha_fin = "'"+pd_fecha_fin+"'";
        String procedureCall = "{call dbSanama.ssm_lab_listar_orden_laboratorio_filtro('"+pv_filtro+"',"+pd_fecha_inicio+","+pd_fecha_fin+")};";
        return jdbcTemplate.query(procedureCall, ordenLaboratorioMapper);
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
            orden.setHoraOrden(rs.getTime("hora_orden").toLocalTime());
            orden.setFechaOrden(rs.getDate("fecha_orden").toLocalDate());
            orden.setTipoOrden(rs.getString("tipo_orden"));
            orden.setInstrucciones(rs.getString("instrucciones"));
            orden.setEstado(rs.getInt("estado"));

            Paciente paciente = new Paciente();
            paciente.setDni(rs.getString("dni_paciente"));
            paciente.setNombres(rs.getString("nombres_paciente"));
            paciente.setApellidoPaterno(rs.getString("paterno_paciente"));
            paciente.setApellidoMaterno(rs.getString("materno_paciente"));

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

            orden.setTipoOrden(rs.getString("tipo_orden"));
            orden.setInstrucciones(rs.getString("instrucciones"));


            Paciente paciente = new Paciente();
            paciente.setDni(rs.getString("dni_paciente"));
            paciente.setNombres(rs.getString("nombres_paciente"));
            paciente.setApellidoPaterno(rs.getString("paterno_paciente"));
            paciente.setApellidoMaterno(rs.getString("materno_paciente"));

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
}
