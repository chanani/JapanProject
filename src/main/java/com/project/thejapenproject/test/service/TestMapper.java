package com.project.thejapenproject.test.service;

import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.test.vo.ChoiceTestSaveReqVO;
import com.project.thejapenproject.test.vo.GetTestListResVO;
import com.project.thejapenproject.test.vo.SortTestListResVO;
import com.project.thejapenproject.test.vo.TestRecordRegisterReqVO;
import com.project.thejapenproject.test.vo.param.SortTestListReqVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface TestMapper {

    // 테스트 볼 목록 조회
    public ArrayList<GetTestListResVO> getTestList(Integer level);

    // 테스트 결과 insert
    public int insertRecord(TestRecordRegisterReqVO testRecordRegisterReqVO);

    // 테스트 상세 결과 저장
    public int recordData(@Param("list") ArrayList<TestItemVO> list,
                          @Param("username")String username);

    // 선택 단에 테스트 문제 풀이 테이블에 저장
    public int registerChoiceTestResult(ChoiceTestSaveReqVO choiceTestSaveReqVO);

    // 선택 단에 테스트 문제 풀이 상세 테이블에 저장
    public int registerChoiceTestResultDetail(ChoiceTestSaveReqVO choiceTestSaveReqVO);

    // 단어 단답형 테스트 목록 조회
    ArrayList<SortTestListResVO> getSortTestList(SortTestListReqVO sortTestListReqVO);
}
