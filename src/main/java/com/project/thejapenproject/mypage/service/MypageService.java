package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.mypage.vo.*;
import com.project.thejapenproject.mypage.vo.param.ChoiceRecordDetailParamVO;
import com.project.thejapenproject.mypage.vo.param.GetRecordListParamVO;

import java.util.ArrayList;

public interface MypageService {
    // 즐겨찾기 목록 API
    public ArrayList<WordVO> favoriteList(String username);
    public PageResponse<RecordVO> recordList(GetRecordListParamVO getRecordListParamVO);
    public ArrayList<RecordDetailsVO> recordDetails(GetRecordDetailsReqVO getRecordDetailsReqVO);
    public UserMypageResVO myInfo(String username);
    public int modifyInfo(UserInfoModifyReqVO userInfoModifyReqVO);
    public void withdrawal(String username);
    public void deleteRecord(int record_num);
    public ArrayList<WordVO> getSchoolList(int schoolWeek);
    public ArrayList getWeekList();

    // 프로필 이미지 수정
    public void userImageChange(String fileName, String username);

    // 단어 선택 테스트 내역 조회
    PageResponse<ChoiceRecordListResVO> choiceRecordList(GetRecordListParamVO getRecordListParamVO);

    // 단어 선택 테스트 상새 내역 조회
    ArrayList<ChoiceRecordListDetailResVO> choiceRecordDetailList(ChoiceRecordDetailParamVO choiceRecordDetailParamVO);
}
