package com.project.thejapenproject.gpt.service;

import com.project.thejapenproject.gpt.vo.AiRecordListResVO;
import com.project.thejapenproject.gpt.vo.RegisterRecordGroupReqVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface GptMapper {

    // DB에 내용 저장(ai_record 테이블 순서, 질문, 답변)
    int registerGptData(@Param("username") String username,
                        @Param("aiRecordNum") String aiRecordNum,
                        @Param("message") String message,
                        @Param("answer") String answer);

    // ai 질문 상세 내용 등록
    int registerGptDataDetail(@Param("username") String username,
                              @Param("aiRecordNum") String aiRecordNum,
                              @Param("message") String message,
                              @Param("answer") String answer);

    // ai 이전 질문 목록 조회
    ArrayList<AiRecordListResVO> getAiRecordList(String username);

    // 질문 그룹 등록
    int registerRecordGroup(RegisterRecordGroupReqVO registerRecordGroupReqVO);
}
