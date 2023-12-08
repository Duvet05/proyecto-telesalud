package com.minsa.sanama.repository.atencionmedica;

import com.minsa.sanama.model.atencionmedica.Resultado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ResultadoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    public ResultadoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final ResultadoMapper resultadoMapper = new ResultadoMapper();

    public List<Resultado> listarResultados(int pn_id_hoja_medica) {
        String procedureCall = "{call dbSanama.ssm_ate_listar_resultados(" + pn_id_hoja_medica + ")};";
        return jdbcTemplate.query(procedureCall, resultadoMapper);
    }

    private static class ResultadoMapper implements RowMapper<Resultado> {
        @Override
        public Resultado mapRow(ResultSet rs, int rowNum) throws SQLException {
            Resultado resultado = new Resultado();

            resultado.setNombre(rs.getString("nombre"));
            resultado.setMedicoFirmante(rs.getString("medico_firmante"));
            resultado.setTipoMuestra(rs.getString("tipo_muestra"));
            resultado.setArchivo(rs.getBytes("archivo"));

            return resultado;
        }
    }
}
