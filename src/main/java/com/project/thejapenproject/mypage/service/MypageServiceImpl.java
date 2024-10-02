package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.mypage.vo.UserMypageResVO;
import com.project.thejapenproject.mypage.vo.UserInfoModifyReqVO;
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
    public UserMypageResVO myInfo(String username) {
        return mypageMapper.myInfo(username);
    }

    @Override
    public int modifyInfo(UserInfoModifyReqVO userInfoModifyReqVO) {
        return mypageMapper.modifyInfo(userInfoModifyReqVO);
    }

    @Override
    public int withdrawal(String username) {
        return mypageMapper.withdrawal(username);
    }

    @Override
    public int deleteRecord(int record_num) {
        return mypageMapper.deleteRecord(record_num);
    }

    @Override
    public ArrayList<WordVO> getSchoolList(int word_week) {
        return mypageMapper.getSchoolList(word_week);
    }

    @Override
    public ArrayList getWeekList() {
        return mypageMapper.getWeekList();
    }

    // 프로필 이미지 수정
    @Override
    public void userImageChange(String fileName, String username) {
        // 기존 이미지 삭제
        mypageMapper.userImageRemove(username);
        // 새로운 이미지 등록
        if(mypageMapper.userImageChange(fileName, username) < 1){
            throw new OperationErrorException(ErrorCode.FAIL_TO_IMAGE);
        }
    }


}
