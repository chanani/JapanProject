package com.project.thejapenproject.gpt.service;


import com.project.thejapenproject.gpt.vo.AiRecordListResVO;

import java.util.ArrayList;

public interface GptService {

    // DB에 내용 저장(ai_record 테이블 순서, 질문, 답변)
    void registerGptData(String username, String aiRecordNum, String message, String answer);

    // ai 질문 이전 목록 조회
    ArrayList<AiRecordListResVO> getAiRecordList(String username);
}
