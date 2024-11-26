package com.project.thejapenproject.gpt.service;


import com.project.thejapenproject.gpt.vo.AiRecordDetailListResVO;
import com.project.thejapenproject.gpt.vo.AiRecordListResVO;
import com.project.thejapenproject.gpt.vo.RegisterRecordGroupReqVO;
import com.project.thejapenproject.gpt.vo.RemoveRecordGroupReqVO;
import com.project.thejapenproject.gpt.vo.param.GetRecordDetailReqVO;

import java.util.ArrayList;

public interface GptService {

    // DB에 내용 저장(ai_record 테이블 순서, 질문, 답변)
    void registerGptData(String username, String aiRecordNum, String message, String answer);

    // ai 질문 이전 목록 조회
    ArrayList<AiRecordListResVO> getAiRecordList(String username);

    // 질문 그룹 등록
    int registerRecordGroup(RegisterRecordGroupReqVO registerRecordGroupReqVO);

    // ai 질문 이전 상세 목록 조회
    ArrayList<AiRecordDetailListResVO> getAiRecordDetailList(GetRecordDetailReqVO getRecordDetailReqVO);

    // ai 질문 그룹 삭제
    int removeRecordAi(RemoveRecordGroupReqVO removeRecordGroupReqVO);

}
