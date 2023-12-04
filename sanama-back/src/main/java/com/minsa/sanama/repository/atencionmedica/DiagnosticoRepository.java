package com.minsa.sanama.repository.atencionmedica;

import com.minsa.sanama.model.atencionmedica.Diagnostico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class DiagnosticoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public DiagnosticoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private final DiagnosticoMapper diagnosticoMapper = new DiagnosticoMapper();

    public List<Diagnostico> listarDiagnosticoFiltro(String pv_filtro) {
        String procedureCall ="{call dbSanama.ssm_ate_listar_diagnostico_filtro('"+pv_filtro+"')}";
        return jdbcTemplate.query(procedureCall, diagnosticoMapper);
    }

    private static class DiagnosticoMapper implements RowMapper<Diagnostico> {
        @Override
        public Diagnostico mapRow(ResultSet rs, int rowNum) throws SQLException {

            Diagnostico diagnostico = new Diagnostico();

            diagnostico.setIdDiagnostico(rs.getInt("id_diagnostico"));
            diagnostico.setIdCiex(rs.getString("id_ciex"));
            diagnostico.setCiex(rs.getString("ciex"));
            return diagnostico;
        }
    }
}
