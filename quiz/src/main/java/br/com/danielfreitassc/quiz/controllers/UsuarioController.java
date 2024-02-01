package br.com.danielfreitassc.quiz.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.danielfreitassc.quiz.dtos.UsuarioRecordDTO;
import br.com.danielfreitassc.quiz.models.UsuarioEntity;
import br.com.danielfreitassc.quiz.services.UsuarioService;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

    UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    

    @PostMapping
    public ResponseEntity<UsuarioEntity> saveUsuario(@RequestBody UsuarioRecordDTO usuarioRecordDTO) {
    return usuarioService.saveUsuario(usuarioRecordDTO);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioEntity>> getAllUsuarios() {
        return usuarioService.getAllUsuariosOrderedByPontos();
    }
}
