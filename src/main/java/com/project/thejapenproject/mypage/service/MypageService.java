package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.RecordDetailsVO;
import com.project.thejapenproject.command.RecordVO;
import com.project.thejapenproject.command.WordVO;

import java.util.ArrayList;

public interface MypageService {
    public ArrayList<WordVO> favoriteList(String username);
    public ArrayList<RecordVO> recordList(String username);
    public ArrayList<RecordDetailsVO> recordDetails(String username, Integer record_num);
}
