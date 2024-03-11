package com.project.thejapenproject.test.service;

import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.command.WordVO;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface TestService {
    public ArrayList<WordVO> getTestList(Integer level);
    public int insertRecord(Integer level, String username, Integer point, boolean kind);
    public int recordData(ArrayList<TestItemVO> list, String username);
}
