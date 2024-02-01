package br.com.danielfreitassc.quiz.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "perguntas")
public class PerguntaEntity{
    @Id
    private Long id;
    
    private String texto;
    private String respostaCorreta;
    private String respostaErradaUm;
    private String respostaErradaDois;
    private String respostaErradaTres;
}

