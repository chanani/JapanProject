package com.project.thejapenproject.test.service;

import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.test.vo.GetTestListResVO;
import com.project.thejapenproject.test.vo.TestRecordRegisterReqVO;
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


}
