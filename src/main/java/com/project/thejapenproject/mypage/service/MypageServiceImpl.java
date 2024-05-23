package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.RecordDetailsVO;
import com.project.thejapenproject.command.RecordVO;
import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.command.WordVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("mypageService")
public class MypageServiceImpl implements MypageService{
    @Autowired
    public MypageMapper mypageMapper;

    @Override
    public ArrayList<WordVO> favoriteList(String username) {
        return mypageMapper.favoriteList(username);
    }

    @Override
    public ArrayList<RecordVO> recordList(String username) {
        return mypageMapper.recordList(username);
    }

    @Override
    public ArrayList<RecordDetailsVO> recordDetails(String username, Integer record_num) {
        return mypageMapper.recordDetails(username, record_num);
    }

    @Override
    public UserVO myInfo(String username) {
        return mypageMapper.myInfo(username);
    }

    @Override
    public int modifyInfo(UserVO userVO) {
        return mypageMapper.modifyInfo(userVO);
    }

    @Override
    public int withdrawal(String username) {
        return mypageMapper.withdrawal(username);
    }


}
