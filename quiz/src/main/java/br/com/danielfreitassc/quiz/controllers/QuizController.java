package br.com.danielfreitassc.quiz.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.danielfreitassc.quiz.dtos.RespostaRecordDTO;
import br.com.danielfreitassc.quiz.models.PerguntaEntity;
import br.com.danielfreitassc.quiz.services.QuizService;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService quizService;

 
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/pergunta")
    public ResponseEntity<PerguntaEntity> salvarPergunta(@RequestBody PerguntaEntity pergunta) {
        PerguntaEntity novaPergunta = quizService.salvarPergunta(pergunta);
        return new ResponseEntity<>(novaPergunta, HttpStatus.CREATED);
    }

    @GetMapping("/pergunta/aleatoria")
    public ResponseEntity<PerguntaEntity> buscarPerguntaAleatoria() {
        PerguntaEntity perguntaAleatoria = quizService.buscarPerguntaAleatoria();
        return ResponseEntity.ok(perguntaAleatoria);
    }

    @PostMapping("/resposta/{perguntaId}")
    public ResponseEntity<String> verificarResposta(@PathVariable Long perguntaId, @RequestBody RespostaRecordDTO respostaDTO) {
        // Chama o serviço para verificar a resposta
        String resultado = quizService.verificarResposta(perguntaId, respostaDTO);
        return ResponseEntity.ok(resultado);
    }
    
}