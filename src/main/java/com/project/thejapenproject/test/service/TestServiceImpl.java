package com.project.thejapenproject.test.service;

import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.command.WordVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("testService")
public class TestServiceImpl implements TestService{

    @Autowired
    public TestMapper testMapper;

    @Override
    public ArrayList<WordVO> getTestList(Integer level) {
        return testMapper.getTestList(level);
    }

    @Override
    public int insertRecord(Integer level, String username, Integer point, boolean kind) {
        return testMapper.insertRecord(level, username, point, kind);
    }

    @Override
    public int recordData(ArrayList<TestItemVO> list, String username) {
        return testMapper.recordData(list, username);
    }




}
