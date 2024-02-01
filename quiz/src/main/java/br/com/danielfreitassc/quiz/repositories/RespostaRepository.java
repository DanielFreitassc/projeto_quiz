package br.com.danielfreitassc.quiz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.danielfreitassc.quiz.models.RespostaEntity;

public interface RespostaRepository extends JpaRepository<RespostaEntity, Long> {

    RespostaEntity findById(long id);
}
