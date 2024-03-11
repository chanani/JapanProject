package com.project.thejapenproject.test.service;

import com.project.thejapenproject.command.TestItemVO;
import com.project.thejapenproject.command.WordVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface TestMapper {
    public ArrayList<WordVO> getTestList(Integer level);
    public int insertRecord(@Param("level")Integer level,
                            @Param("username")String username,
                            @Param("point") Integer point,
                            @Param("kind") boolean kind);
    public int recordData(@Param("list") ArrayList<TestItemVO> list,
                          @Param("username")String username);


}
