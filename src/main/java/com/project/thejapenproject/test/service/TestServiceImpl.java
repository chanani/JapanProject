package com.project.thejapenproject.test.service;

import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.test.vo.GetTestListResVO;
import com.project.thejapenproject.test.vo.TestRecordRegisterReqVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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




}
