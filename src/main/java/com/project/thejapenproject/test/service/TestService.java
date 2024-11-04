package com.project.thejapenproject.test.service;

import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.test.vo.*;
import com.project.thejapenproject.test.vo.param.ShortTestListReqVO;

import java.util.ArrayList;

public interface TestService {

    // 테스트 내용 가져오기
    public ArrayList<GetTestListResVO> getTestList(Integer level);
    // 테스트 결과 저장
    public int insertRecord(TestRecordRegisterReqVO testRecordRegisterReqVO);
    // 테스트 상세결과 저장
    public int recordData(ArrayList<TestItemVO> list, String username);

    // 선택 단어 테스트 데이터 저장
    public void registerChoiceTest(ChoiceTestSaveReqVO choiceTestSaveReqVO);

    // 단어 단답형 테스트 목록 조회
    ArrayList<ShortTestListResVO> getShortTestList(ShortTestListReqVO shortTestListReqVO);

    // 단답형 단어 테스트 테이터 저장
    public void registerShortTest(ShortTestSaveReqVO shortTestSaveReqVO);
}
