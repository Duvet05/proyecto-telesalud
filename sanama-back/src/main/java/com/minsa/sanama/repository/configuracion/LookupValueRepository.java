package com.minsa.sanama.repository.configuracion;

import com.minsa.sanama.model.configuracion.LookupValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
@Repository
public class LookupValueRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
    public LookupValueRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final ListaValoresMapper listaValoresMapper = new ListaValoresMapper();
    private final ListaValoresMedicosMapper listaValoresMedicosMapper = new ListaValoresMedicosMapper();
    public List<LookupValue> listarValoresParentezcos() {
        String procedureCall = "{call dbSanama.ssm_conf_listar_parentezcos()};";
        return jdbcTemplate.query(procedureCall, listaValoresMapper);
    }

    public List<LookupValue> listarValoresSeguros() {
        String procedureCall = "{call dbSanama.ssm_conf_listar_seguros()};";
        return jdbcTemplate.query(procedureCall, listaValoresMapper);
    }

    public List<LookupValue> listarMedicosLab() {
        String procedureCall = "{call dbSanama.ssm_conf_listar_lab_medicos()};";
        return jdbcTemplate.query(procedureCall, listaValoresMedicosMapper);
    }

    public List<LookupValue> listarEstadosCitas() {
        String procedureCall = "{call dbSanama.ssm_conf_listar_estados_citas()};";
        return jdbcTemplate.query(procedureCall, listaValoresMapper);
    }

    public List<LookupValue> listarEstadosCitasOrdenes() {
        String procedureCall = "{call dbSanama.ssm_conf_listar_estados_citas_ordenes()};";
        return jdbcTemplate.query(procedureCall, listaValoresMapper);
    }

    public List<LookupValue> getStatusCita(int pn_id_cita) {
        String procedureCall = "{call dbSanama.ssm_conf_get_status_cita("+pn_id_cita+")};";
        return jdbcTemplate.query(procedureCall, listaValoresMapper);
    }


    private static class ListaValoresMapper implements RowMapper<LookupValue> {
        @Override
        public LookupValue mapRow(ResultSet rs, int rowNum) throws SQLException {

            LookupValue lookupValue = new LookupValue();

            lookupValue.setIdValue(rs.getInt("id_value"));
            lookupValue.setDescripcion(rs.getString("descripcion"));
            //lookupValue.setEstado(1);

            return lookupValue;
        }
    }

    private static class ListaValoresMedicosMapper implements RowMapper<LookupValue> {
        @Override
        public LookupValue mapRow(ResultSet rs, int rowNum) throws SQLException {

            LookupValue lookupValue = new LookupValue();

            lookupValue.setIdValue(rs.getInt("id_medico"));
            lookupValue.setDescripcion(rs.getString("nombre_completo"));
            lookupValue.setEstado(1);
            return lookupValue;
        }
    }


}
