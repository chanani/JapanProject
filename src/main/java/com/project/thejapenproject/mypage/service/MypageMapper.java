package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.mypage.vo.GetRecordDetailsReqVO;
import com.project.thejapenproject.mypage.vo.UserMypageResVO;
import com.project.thejapenproject.mypage.vo.UserInfoModifyReqVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface MypageMapper {
    public ArrayList<WordVO> favoriteList(String username);
    public ArrayList<RecordVO> recordList(String username);
    public ArrayList<RecordDetailsVO> recordDetails(GetRecordDetailsReqVO getRecordDetailsReqVO);
    public UserMypageResVO myInfo(String username);
    public int modifyInfo(UserInfoModifyReqVO userInfoModifyReqVO);
    public int withdrawal(String username);
    public int deleteRecord(int recordNum);
    public ArrayList<WordVO> getSchoolList(int wordWeek);
    public ArrayList getWeekList();

    // 프로필 이미지 수정을 위해 삭제
    public int userImageRemove(@Param("username") String username);

    // 프로필 이미지 수정
    public int userImageChange(@Param("fileName") String fileName, @Param("username") String username);

}
