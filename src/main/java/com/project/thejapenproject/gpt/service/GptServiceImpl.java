package com.project.thejapenproject.gpt.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.gpt.vo.AiRecordListResVO;
import com.project.thejapenproject.gpt.vo.RegisterRecordGroupReqVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class GptServiceImpl implements GptService {

    private final GptMapper gptMapper;

    // DB에 내용 저장(ai_record 테이블 순서, 질문(제목), 답변)
    @Override
    @Transactional
    public void registerGptData(String username,
                                String aiRecordNum,
                                String message,
                                String answer) {
        try {
            // Jackson ObjectMapper 생성
            ObjectMapper objectMapper = new ObjectMapper();

            // JSON 문자열을 JsonNode로 파싱
            JsonNode rootNode = objectMapper.readTree(answer);

            // "choices" 배열의 첫 번째 객체에서 "message" -> "content" 값 추출
            String content = rootNode
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            answer = content;
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 조회 후 이미 존재하는 ai_record_num 일경우 detail 데이터만 추가


        // ai_record 테이블에 등록
        if (gptMapper.registerGptData(username,
                aiRecordNum,
                message,
                answer) < 1) {
            throw new OperationErrorException(ErrorCode.FAIL_TO_GPT_RECORD);
        }

        // ai_record_detail 테이블에 등록
        if (gptMapper.registerGptDataDetail(username,
                aiRecordNum,
                message,
                answer) < 1) {
            throw new OperationErrorException(ErrorCode.FAIL_TO_GPT_RECORD);
        }


    }

    // ai 이전 질문 목록 조회
    @Override
    public ArrayList<AiRecordListResVO> getAiRecordList(String username) {
        return gptMapper.getAiRecordList(username);
    }

    // 질문 그룹 등록
    @Override
    public int registerRecordGroup(RegisterRecordGroupReqVO registerRecordGroupReqVO) {
        return gptMapper.registerRecordGroup(registerRecordGroupReqVO);
    }
}
