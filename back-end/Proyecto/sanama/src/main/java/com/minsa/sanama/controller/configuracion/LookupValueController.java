package com.minsa.sanama.controller.configuracion;

import com.minsa.sanama.model.configuracion.LookupValue;
import com.minsa.sanama.services.configuracion.LookupValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/configuracion")
@CrossOrigin
public class LookupValueController {
    @Autowired
    LookupValueService valueService;

    @GetMapping(value = "/get/listarParentezcos")
    @ResponseBody
    public List<LookupValue> listarParentezcos() {
        List<LookupValue> lvalores;
        lvalores = valueService.listarParentezcos();
        return lvalores;
    }

    @GetMapping(value = "/get/listarSeguros")
    @ResponseBody
    public List<LookupValue> listarSeguros() {
        List<LookupValue> lvalores;
        lvalores = valueService.listarSeguros();
        return lvalores;
    }

    @GetMapping(value = "/get/listarMedicosLab")
    @ResponseBody
    public List<LookupValue> listarMedicosLab() {
        List<LookupValue> lmedicos;
        lmedicos = valueService.listarMedicosLab();
        return lmedicos;
    }
}
