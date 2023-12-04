package com.minsa.sanama.services.atencion;

import com.minsa.sanama.model.admision.ProgramacionCita;
import com.minsa.sanama.model.atencionmedica.HojaMedica;
import com.minsa.sanama.model.atencionmedica.Resultado;
import com.minsa.sanama.model.laboratorio.ExamenMedico;
import com.minsa.sanama.model.laboratorio.OrdenLaboratorio;
import com.minsa.sanama.repository.atencionmedica.HojaMedicaRepository;
import com.minsa.sanama.repository.atencionmedica.RecetaMedicaRepository;
import com.minsa.sanama.repository.atencionmedica.ResultadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HojaMedicaService {
    @Autowired
    HojaMedicaRepository hojaMedicaRepository;
    @Autowired
    RecetaMedicaRepository recetaMedicaRepository;
    @Autowired
    ResultadoRepository resultadoRepository;

    public int registrarHojaMedica(HojaMedica hojaMedica,int pn_id_historial_clinico) {
        int valido;
        valido = hojaMedicaRepository.registrarHojaMedica(hojaMedica,pn_id_historial_clinico);

        return valido;
    }

    public int eliminarHojaMedica(String pn_id_hoja_medica) {
        int valido;
        valido = hojaMedicaRepository.eliminarHojaMedica(pn_id_hoja_medica);

        return valido;
    }

    public ProgramacionCita buscarTriajeCitaMedica(int pn_id_cita) {
        ProgramacionCita cita;
        cita = hojaMedicaRepository.buscarTriajeCitaMedica(pn_id_cita).get(0);
        return cita;
    }

    public int registrarNuevaHojaMedica(HojaMedica hojaMedica) {
        int idHojaMedica;
        idHojaMedica = hojaMedicaRepository.registrarNuevaHojaMedica(hojaMedica);
        return idHojaMedica;
    }

    public int registrarRecetaMedicaPrueba() {
        int idReceta;
        idReceta = recetaMedicaRepository.registrarRecetaMedicaPrueba();
        return idReceta;
    }

    public List<HojaMedica> listarHojasMedicasFiltro(String pn_id_paciente, String pn_id_especialidad, String pd_fecha_inicio, String pd_fecha_fin) {
        List<HojaMedica> lhoja = null;
        lhoja = hojaMedicaRepository.listarHojasMedicasFiltro(pn_id_paciente, pn_id_especialidad, pd_fecha_inicio, pd_fecha_fin);
        return lhoja;
    }


    public HojaMedica buscarHojaMedicaPaciente(int pn_id_hoja_medica) {
        HojaMedica hojaMedica;
        hojaMedica = hojaMedicaRepository.buscarHojaMedicaPaciente(pn_id_hoja_medica);
        return hojaMedica;
    }

    public HojaMedica mostrarCodigoHojaMedicaCita(int pn_id_cita) {
        HojaMedica hojaMedica;
        hojaMedica = hojaMedicaRepository.mostrarCodigoHojaMedicaCita(pn_id_cita).get(0);
        return hojaMedica;
    }

    public HojaMedica buscarResultadosPaciente(int pn_id_hoja_medica) {
        /*HojaMedica hojaMedica;
        hojaMedica = hojaMedicaRepository.buscarResultadosPaciente(pn_id_hoja_medica);
        return hojaMedica;*/

        HojaMedica hojaMedica=null;
        List<Resultado> lresultados=null;
        List<HojaMedica> lhojas;
        lhojas = hojaMedicaRepository.buscarDatosResultadosHojaMedica(pn_id_hoja_medica);
        if(!lhojas.isEmpty()){
            hojaMedica = lhojas.get(0);
            lresultados = resultadoRepository.listarResultados(pn_id_hoja_medica);
            hojaMedica.setResultados(lresultados);
        }

        return hojaMedica;
    }
}
