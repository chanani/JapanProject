package com.project.thejapenproject.test.service;

import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.test.vo.ChoiceTestSaveReqVO;
import com.project.thejapenproject.test.vo.GetTestListResVO;
import com.project.thejapenproject.test.vo.TestRecordRegisterReqVO;
import org.apache.ibatis.annotations.Param;

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

}
