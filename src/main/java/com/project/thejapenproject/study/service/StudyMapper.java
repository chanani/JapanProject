package com.project.thejapenproject.study.service;

import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.study.vo.ResultFavoriteCheckResVO;
import com.project.thejapenproject.study.vo.StudyChoiceResVO;
import com.project.thejapenproject.study.vo.StudyChoiceExampleVO;
import com.project.thejapenproject.study.vo.param.ResultAddFavoriteParamVO;
import com.project.thejapenproject.study.vo.param.ResultFavoriteCheckParamVO;
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

    // 즐겨찾기 여부 조회
    public ArrayList<Integer> getFavoriteCheckList(ResultFavoriteCheckParamVO favoriteVO);

    // 현재 즐겨 찾기 여부 확인
    public int currentFavoriteCheck(ResultAddFavoriteParamVO favoriteVO);

    // 선택 학습 결과 페이지 즐겨찾기 추가
    public int resultAddFavorite(ResultAddFavoriteParamVO favoriteVO);

    // 선택 학습 결과 페이지 즐겨찾기 삭제
    public int resultDeleteFavorite(ResultAddFavoriteParamVO favoriteVO);
}
