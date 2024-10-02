package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.mypage.vo.UserMypageResVO;
import com.project.thejapenproject.mypage.vo.UserInfoModifyReqVO;

import java.util.ArrayList;

public interface MypageService {
    public ArrayList<WordVO> favoriteList(String username);
    public ArrayList<RecordVO> recordList(String username);
    public ArrayList<RecordDetailsVO> recordDetails(String username, Integer record_num);
    public UserMypageResVO myInfo(String username);
    public int modifyInfo(UserInfoModifyReqVO userInfoModifyReqVO);
    public int withdrawal(String username);
    public int deleteRecord(int record_num);
    public ArrayList<WordVO> getSchoolList(int school_week);
    public ArrayList getWeekList();

    // 프로필 이미지 수정
    public void userImageChange(String fileName, String username);
}
