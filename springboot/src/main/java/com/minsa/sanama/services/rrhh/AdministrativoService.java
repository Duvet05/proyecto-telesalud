package com.minsa.sanama.services.rrhh;

import com.minsa.sanama.model.rrhh.Administrativo;
import com.minsa.sanama.repository.rrhh.AdministrativoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministrativoService {

    @Autowired
    AdministrativoRepository administrativoRepository;
    public List<Administrativo> listarAdminsitrativos(){
        List<Administrativo> lAdministrativos;
        lAdministrativos = administrativoRepository.listarAdminsitrativos();
        return lAdministrativos;
    }

    public int registrarAdministrativo(Administrativo administrativo){
        int idAdministrativo;
        idAdministrativo = administrativoRepository.registrarAdministrativo(administrativo);
        return idAdministrativo;
    }

    public int actualizarAdministrativo(Administrativo administrativo){
        int n;
        n = administrativoRepository.actualizarAdministrativo(administrativo);
        return n;
    }
    public int eliminarAdministrativo(Administrativo administrativo){
        int n;
        n = administrativoRepository.eliminarAdministrativo(administrativo);
        return n;
    }

}
