package br.com.danielfreitassc.quiz.dtos;

public class RespostaRecordDTO {
    private String usuario;
    private String resposta;

    // Getters e setters

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getResposta() {
        return resposta;
    }

    public void setResposta(String resposta) {
        this.resposta = resposta;
    }
}