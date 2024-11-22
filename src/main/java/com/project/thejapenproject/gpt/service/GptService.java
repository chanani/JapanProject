package com.project.thejapenproject.gpt.service;


public interface GptService {

    // DB에 내용 저장(ai_record 테이블 순서, 질문, 답변)
    void registerGptData(String username, String aiRecordNum, String message, String answer);
}
