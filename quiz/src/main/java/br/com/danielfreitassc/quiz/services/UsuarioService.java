package br.com.danielfreitassc.quiz.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Comparator;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.danielfreitassc.quiz.dtos.UsuarioRecordDTO;
import br.com.danielfreitassc.quiz.models.UsuarioEntity;
import br.com.danielfreitassc.quiz.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    private UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public ResponseEntity<UsuarioEntity> saveUsuario(UsuarioRecordDTO usuarioRecordDTO) {
        String nome = usuarioRecordDTO.getNome();
        UsuarioEntity usuarioExistente = usuarioRepository.findByNome(nome);

        if (usuarioExistente != null) {
            // Se o usuário já existe, atualize os pontos
            int pontosNovos = usuarioRecordDTO.getPontos();
            int pontosExistente = usuarioExistente.getPontos();
            usuarioExistente.setPontos(pontosExistente + pontosNovos);
            return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.save(usuarioExistente));
        } else {
            // Se o usuário não existe, crie um novo
            var usuarioEntity = new UsuarioEntity();
            BeanUtils.copyProperties(usuarioRecordDTO, usuarioEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioRepository.save(usuarioEntity));
        }
    }

        public ResponseEntity<List<UsuarioEntity>> getAllUsuariosOrderedByPontos() {
        List<UsuarioEntity> usuariosList = usuarioRepository.findAll();
        
        // Ordenar a lista com base nos pontos
        List<UsuarioEntity> usuariosOrdenados = usuariosList.stream()
                .sorted(Comparator.comparingInt(UsuarioEntity::getPontos).reversed()) // Ordena de forma decrescente
                .collect(Collectors.toList());
        
        return ResponseEntity.status(HttpStatus.OK).body(usuariosOrdenados);
    }
}

