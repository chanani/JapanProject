package com.project.thejapenproject.study.service;

import com.project.thejapenproject.command.WordVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("studyService")
public class StudyServiceImpl implements StudyService {

    @Autowired
    public StudyMapper studyMapper;


    @Override
    public ArrayList<WordVO> getWord(Integer level, Integer num, String username) {
        return studyMapper.getWord(level, num, username);
    }

    @Override
    public int addFavorite(Integer word_num, String username) {
        return studyMapper.addFavorite(word_num, username);
    }

    @Override
    public int deleteFavorite(Integer word_num, String username) {
        return studyMapper.deleteFavorite(word_num, username);
    }


}
