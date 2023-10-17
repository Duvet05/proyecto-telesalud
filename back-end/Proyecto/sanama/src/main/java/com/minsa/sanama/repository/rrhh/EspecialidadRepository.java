package com.minsa.sanama.repository.rrhh;

import com.minsa.sanama.model.rrhh.Especialidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class EspecialidadRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    private final EspecialidadMapper especialidadMapper = new EspecialidadMapper();

    // llamamos al procedure para listar las especialidades
    public List<Especialidad> listarEspecialidades() {
        String procedureCall = "{call dbSanama.ssm_rrhh_listar_especialidad()}";
        return jdbcTemplate.query(procedureCall, especialidadMapper);

    }

    public List<Especialidad> listarEspecialidadesporNombre(String pv_filtro) {
        String procedureCall = "{call dbSanama.ssm_adm_ListarEspecialidadesPorNombre('" + pv_filtro + "')};";
        return jdbcTemplate.query(procedureCall, especialidadMapper);
    }

    private static class EspecialidadMapper implements RowMapper<Especialidad> {
        @Override
        public Especialidad mapRow(ResultSet rs, int rowNum) throws SQLException {

            Especialidad especialidad = new Especialidad();

            especialidad.setIdEspecialidad(rs.getInt("id_especialidad"));
            especialidad.setCodigo(rs.getString("codigo"));
            especialidad.setNombre(rs.getString("nombre"));
            especialidad.setDescripcion(rs.getString("descripcion"));
            especialidad.setEstado(rs.getInt("estado"));

            return especialidad;
        }

    }
}
