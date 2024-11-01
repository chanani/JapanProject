package com.project.thejapenproject.test.service;

import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.test.vo.ChoiceTestSaveReqVO;
import com.project.thejapenproject.test.vo.GetTestListResVO;
import com.project.thejapenproject.test.vo.SortTestListResVO;
import com.project.thejapenproject.test.vo.TestRecordRegisterReqVO;
import com.project.thejapenproject.test.vo.param.SortTestListReqVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service("testService")
public class TestServiceImpl implements TestService{

    @Autowired
    public TestMapper testMapper;

    @Override
    public ArrayList<GetTestListResVO> getTestList(Integer level) {
        return testMapper.getTestList(level);
    }

    @Override
    public int insertRecord(TestRecordRegisterReqVO testRecordRegisterReqVO) {
        return testMapper.insertRecord(testRecordRegisterReqVO);
    }

    @Override
    public int recordData(ArrayList<TestItemVO> list, String username) {
        return testMapper.recordData(list, username);
    }

    // 선택 단어 테스트 데이터 저장
    @Override
    @Transactional
    public void registerChoiceTest(ChoiceTestSaveReqVO choiceTestSaveReqVO) {
        // 선택 단에 테스트 문제 풀이 테이블에 저장
        int result = testMapper.registerChoiceTestResult(choiceTestSaveReqVO);
        // 선택 단에 테스트 문제 풀이 상세 테이블에 저장
        int detailResult = testMapper.registerChoiceTestResultDetail(choiceTestSaveReqVO);

        if(result < 1 || detailResult < 1){
            throw new OperationErrorException(ErrorCode.FAIL_TO_CHOICE_TEST_REGISTER);
        }
    }

    // 단어 단답형 테스트 목록 조회
    @Override
    public ArrayList<SortTestListResVO> getSortTestList(SortTestListReqVO sortTestListReqVO) {
        return testMapper.getSortTestList(sortTestListReqVO);
    }


}
