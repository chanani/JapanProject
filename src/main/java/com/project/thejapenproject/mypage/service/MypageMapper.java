package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.mypage.vo.*;
import com.project.thejapenproject.mypage.vo.param.ChoiceRecordDetailParamVO;
import com.project.thejapenproject.mypage.vo.param.GetRecordListParamVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface MypageMapper {
    public ArrayList<WordVO> favoriteList(String username);
    public ArrayList<RecordVO> recordList(GetRecordListParamVO getRecordListParamVO);
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

    // 단어 선택 테스트 내역 조회
    ArrayList<ChoiceRecordListResVO> choiceRecordList(GetRecordListParamVO getRecordListParamVO);

    // 단어 선택 테스트 상새 내역 조회
    ArrayList<ChoiceRecordListDetailResVO> choiceRecordDetailList(ChoiceRecordDetailParamVO choiceRecordDetailParamVO);
}
