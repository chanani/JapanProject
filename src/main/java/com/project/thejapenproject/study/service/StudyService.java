package com.project.thejapenproject.study.service;

import com.project.thejapenproject.command.WordVO;

import java.util.ArrayList;

public interface StudyService {
    public ArrayList<WordVO> getWord(Integer level, Integer num, String username);
    public int addFavorite(Integer word_num, String username);
    public int deleteFavorite(Integer word_num, String username);
}
