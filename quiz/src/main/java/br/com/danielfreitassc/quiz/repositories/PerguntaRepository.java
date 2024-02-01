package br.com.danielfreitassc.quiz.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.danielfreitassc.quiz.models.PerguntaEntity;

public interface PerguntaRepository extends JpaRepository<PerguntaEntity, Long> {
    
    Optional<PerguntaEntity> findById(Long id);
}
