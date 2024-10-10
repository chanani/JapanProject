package com.project.thejapenproject.study.service;

import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.study.vo.StudyChoiceResVO;
import com.project.thejapenproject.study.vo.StudyChoiceExampleVO;
import com.project.thejapenproject.study.vo.param.StudyChoiceParamVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface StudyMapper {
    public ArrayList<WordVO> getWord(@Param("level") Integer level, @Param("num") Integer num, @Param("username") String username);
    public int addFavorite(@Param("word_num") Integer word_num, @Param("username") String username);
    public int deleteFavorite(@Param("word_num")Integer word_num, @Param("username") String username);

    // 선택 학습 단어 가져오기
    public ArrayList<StudyChoiceResVO> getChoiceList(StudyChoiceParamVO studyChoiceParamVO);

    // 선택 학습 예제 단어 가져오기
    public ArrayList<StudyChoiceExampleVO> getChoiceExampleData(Integer wordNum);
}
