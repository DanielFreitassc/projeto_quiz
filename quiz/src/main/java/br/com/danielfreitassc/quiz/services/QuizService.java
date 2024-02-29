package br.com.danielfreitassc.quiz.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.danielfreitassc.quiz.dtos.RespostaRecordDTO;
import br.com.danielfreitassc.quiz.models.PerguntaEntity;
import br.com.danielfreitassc.quiz.repositories.PerguntaRepository;

@Service
public class QuizService {

    private final PerguntaRepository perguntaRepository;

    public QuizService(PerguntaRepository perguntaRepository) {
        this.perguntaRepository = perguntaRepository;
    }

    public PerguntaEntity salvarPergunta(PerguntaEntity pergunta) {
        return perguntaRepository.save(pergunta);
    }

    public PerguntaEntity buscarPerguntaAleatoria() {
        long randomId = (long) (Math.random() * 100) + 1;
        Optional<PerguntaEntity> perguntaOptional = perguntaRepository.findById(randomId);
        return perguntaOptional.orElse(new PerguntaEntity());
    }
    
    public String verificarResposta(Long perguntaId, RespostaRecordDTO respostaDTO) {
        String resposta = respostaDTO.getResposta();
    
        Optional<PerguntaEntity> perguntaOptional = perguntaRepository.findById(perguntaId);
    
        if (perguntaOptional.isEmpty()) {
            return "Pergunta não encontrada";
        }
    
        PerguntaEntity pergunta = perguntaOptional.get();
    
        if (resposta.isEmpty()) {
            return "Resposta vazia. Tente novamente!";
        }
    
        if (resposta.equalsIgnoreCase(pergunta.getRespostaCorreta())) {
            return "Resposta correta!";
        } else {
            return "Resposta incorreta. Tente novamente!";
        }
    }
}
