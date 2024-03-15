package com.project.thejapenproject.admin.service;

import com.project.thejapenproject.command.WordVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface AdminMapper {
    public int addWordList(ArrayList<WordVO> list);

}
