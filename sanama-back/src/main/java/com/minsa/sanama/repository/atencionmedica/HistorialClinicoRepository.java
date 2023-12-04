package com.minsa.sanama.repository.atencionmedica;

import com.minsa.sanama.model.atencionmedica.CitaMedica;
import com.minsa.sanama.model.atencionmedica.HistorialClinico;
import com.minsa.sanama.model.atencionmedica.HojaMedica;
import com.minsa.sanama.model.rrhh.Especialidad;
import com.minsa.sanama.model.rrhh.Medico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class HistorialClinicoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    private final HistorialMapper historialMapper = new HistorialMapper();
    private final HojaMedicaMapper hojaMedicaMapper = new HojaMedicaMapper();

    public HistorialClinico buscarHistorialClinico(String pn_id_paciente) {

        HistorialClinico historialClinico=null;
        String procedureCall ="{call dbSanama.ssm_ate_buscar_historial_clinico_x_paciente("+pn_id_paciente+")}";
        List<HistorialClinico> historiales=jdbcTemplate.query(procedureCall, historialMapper);
        if(!historiales.isEmpty()){
            historialClinico = historiales.get(0);
            procedureCall="{call dbSanama.ssm_ate_listar_hoja_medica_x_hitorial_clinico("+historialClinico.getIdHistorialClinico()+")}";
            historialClinico.setHojasMedicas((ArrayList<HojaMedica>)jdbcTemplate.query(procedureCall, hojaMedicaMapper));
            return historialClinico;
        }
        return null;
    }

    private static class HistorialMapper implements RowMapper<HistorialClinico> {
        @Override
        public HistorialClinico mapRow(ResultSet rs, int rowNum) throws SQLException {

            HistorialClinico historialClinico = new HistorialClinico();

            historialClinico.setIdHistorialClinico(rs.getInt("id_historial_clinico"));
            historialClinico.setCodigo(rs.getString("codigo_hc"));
            return historialClinico;
        }
    }

    private static class HojaMedicaMapper implements RowMapper<HojaMedica> {
        @Override
        public HojaMedica mapRow(ResultSet rs, int rowNum) throws SQLException {

            HojaMedica hojaMedica = new HojaMedica();

            hojaMedica.setIdHojaMedica(rs.getInt("id_hoja_medica"));
            hojaMedica.setCodigo(rs.getString("codigo"));
            hojaMedica.setFechaAtencion(rs.getDate("fecha_atencion").toLocalDate());
            hojaMedica.setHoraAtencion(rs.getTime("hora_atencion").toLocalTime());
            hojaMedica.setCitaMedica(new CitaMedica());
            hojaMedica.getCitaMedica().setMedico(new Medico());
            hojaMedica.getCitaMedica().getMedico().setNombres(rs.getString("nombres"));
            hojaMedica.getCitaMedica().getMedico().setApellidoPaterno(rs.getString("apellido_paterno"));
            hojaMedica.getCitaMedica().getMedico().setApellidoMaterno(rs.getString("apellido_materno"));
            hojaMedica.getCitaMedica().getMedico().setEspecialidad(new Especialidad());
            hojaMedica.getCitaMedica().getMedico().getEspecialidad().setNombre(rs.getString("nombre_especialidad"));

            return hojaMedica;
        }
    }
}
