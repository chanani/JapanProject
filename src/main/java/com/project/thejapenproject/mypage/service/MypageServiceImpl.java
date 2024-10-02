package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.mypage.vo.GetRecordDetailsReqVO;
import com.project.thejapenproject.mypage.vo.UserMypageResVO;
import com.project.thejapenproject.mypage.vo.UserInfoModifyReqVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("mypageService")
public class MypageServiceImpl implements MypageService{
    @Autowired
    public MypageMapper mypageMapper;

    // 즐겨찾기 목록 API
    @Override
    public ArrayList<WordVO> favoriteList(String username) {
        return mypageMapper.favoriteList(username);
    }

    @Override
    public ArrayList<RecordVO> recordList(String username) {
        return mypageMapper.recordList(username);
    }

    @Override
    public ArrayList<RecordDetailsVO> recordDetails(GetRecordDetailsReqVO getRecordDetailsReqVO) {
        return mypageMapper.recordDetails(getRecordDetailsReqVO);
    }

    @Override
    public UserMypageResVO myInfo(String username) {
        return mypageMapper.myInfo(username);
    }

    @Override
    public int modifyInfo(UserInfoModifyReqVO userInfoModifyReqVO) {
        return mypageMapper.modifyInfo(userInfoModifyReqVO);
    }

    // 회원 탈퇴
    @Override
    public void withdrawal(String username) {
        if(mypageMapper.withdrawal(username) < 1){
            throw new OperationErrorException(ErrorCode.FAILED_TO_WITHDRAWAL);
        }
    }

    // 학습 기록 삭제
    @Override
    public void deleteRecord(int recordNum) {
        if(mypageMapper.deleteRecord(recordNum) < 1){
            throw new RequestParameterException(ErrorCode.FAIL_TO_REMOVE_RECORD);
        }
    }

    @Override
    public ArrayList<WordVO> getSchoolList(int wordWeek) {
        return mypageMapper.getSchoolList(wordWeek);
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
