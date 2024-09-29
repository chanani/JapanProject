package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.*;

import java.util.ArrayList;

public interface MypageService {
    public ArrayList<WordVO> favoriteList(String username);
    public ArrayList<RecordVO> recordList(String username);
    public ArrayList<RecordDetailsVO> recordDetails(String username, Integer record_num);
    public UserVO myInfo(String username);
    public int modifyInfo(UserVO userVO);
    public int withdrawal(String username);
    public int deleteRecord(int record_num);
    public ArrayList<WordVO> getSchoolList(int school_week);
    public ArrayList getWeekList();

    // 프로필 이미지 수정
    public void userImageChange(String fileName, String username);
}
