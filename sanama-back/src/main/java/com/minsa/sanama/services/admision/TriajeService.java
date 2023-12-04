package com.minsa.sanama.services.admision;

import com.minsa.sanama.model.admision.Triaje;
import com.minsa.sanama.repository.admision.TriajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TriajeService {

    @Autowired
    TriajeRepository triajeRepository;

    public List<Triaje> listarTriajePorFiltro(String pv_filtro,String pd_fecha_inicio,String pd_fecha_fin, List<String> estados) {
        List<Triaje> triajes;
        triajes = triajeRepository.listarTriajePorFiltro(pv_filtro,pd_fecha_inicio,pd_fecha_fin,estados);
        return triajes;
    }

    public Triaje buscarTriajeID(String pv_filtro) {
        List<Triaje> triajes;
        triajes = triajeRepository.buscarTriaje(pv_filtro);
        return triajes.get(0);
    }

    public int actualizarTriaje(Triaje triaje) {
        return triajeRepository.actualizarTriaje(triaje);
    }

    public int eliminarTriaje(Triaje triaje) {
        return triajeRepository.eliminarTriaje(triaje);
    }

}