package com.project.thejapenproject.gpt.service;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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

}
