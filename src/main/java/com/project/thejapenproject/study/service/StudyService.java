package com.project.thejapenproject.study.service;

import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.study.vo.ResultFavoriteCheckResVO;
import com.project.thejapenproject.study.vo.StudyChoiceResVO;
import com.project.thejapenproject.study.vo.param.ResultAddFavoriteParamVO;
import com.project.thejapenproject.study.vo.param.ResultFavoriteCheckParamVO;
import com.project.thejapenproject.study.vo.param.StudyChoiceParamVO;

import java.util.ArrayList;

public interface StudyService {
    public ArrayList<WordVO> getWord(Integer level, Integer num, String username);

    public int addFavorite(Integer word_num, String username);

    public int deleteFavorite(Integer word_num, String username);

    // 선택 학습 목록 가져오기
    public ArrayList<StudyChoiceResVO> getChoiceList(StudyChoiceParamVO studyChoiceParamVO);

    // 즐겨찾기 여부 확인
    public ArrayList<Integer> getFavoriteCheckList(ResultFavoriteCheckParamVO favoriteVO);

    // 선택 학습 결과 페이지 즐겨찾기 추가 및 삭제
    public void resultAddFavorite(ResultAddFavoriteParamVO favoriteVO);
}
