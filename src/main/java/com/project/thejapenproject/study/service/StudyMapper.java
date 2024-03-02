package com.project.thejapenproject.study.service;

import com.project.thejapenproject.command.WordVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface StudyMapper {
    public ArrayList<WordVO> getWord(@Param("level") Integer level, @Param("num") Integer num, @Param("username") String username);
    public int addFavorite(@Param("word_num") Integer word_num, @Param("username") String username);
    public int deleteFavorite(@Param("word_num")Integer word_num, @Param("username") String username);



}
