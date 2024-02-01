package br.com.danielfreitassc.quiz.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "respostas")
public class RespostaEntity{
    @Id
    private Long id;
    private Long perguntaId;
    private String texto;

}
