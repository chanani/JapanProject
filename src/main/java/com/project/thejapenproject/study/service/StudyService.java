package com.project.thejapenproject.study.service;

import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.study.vo.StudyChoiceResVO;
import com.project.thejapenproject.study.vo.param.StudyChoiceParamVO;

import java.util.ArrayList;

public interface StudyService {
    public ArrayList<WordVO> getWord(Integer level, Integer num, String username);

    public int addFavorite(Integer word_num, String username);

    public int deleteFavorite(Integer word_num, String username);

    // 선택 학습 목록 가져오기
    public ArrayList<StudyChoiceResVO> getChoiceList(StudyChoiceParamVO studyChoiceParamVO);
}
