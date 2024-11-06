package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.mypage.vo.*;
import com.project.thejapenproject.mypage.vo.param.ChoiceRecordDetailParamVO;
import com.project.thejapenproject.mypage.vo.param.GetRecordListParamVO;
import com.project.thejapenproject.mypage.vo.param.ShortRecordDetailParamVO;

import java.util.ArrayList;

public interface MypageService {
    // 즐겨찾기 목록 API
    public ArrayList<WordVO> favoriteList(String username);
    public ArrayList<RecordDetailsVO> recordDetails(GetRecordDetailsReqVO getRecordDetailsReqVO);
    public UserMypageResVO myInfo(String username);
    public int modifyInfo(UserInfoModifyReqVO userInfoModifyReqVO);
    public void withdrawal(String username);
    public void deleteShortRecord(int strNum);
    public ArrayList<WordVO> getSchoolList(int schoolWeek);
    public ArrayList getWeekList();

    // 프로필 이미지 수정
    public void userImageChange(String fileName, String username);

    // 단어 선택 테스트 내역 조회
    PageResponse<ChoiceRecordListResVO> choiceRecordList(GetRecordListParamVO getRecordListParamVO);

    // 단어 선택 테스트 상새 내역 조회
    ArrayList<ChoiceRecordListDetailResVO> choiceRecordDetailList(ChoiceRecordDetailParamVO choiceRecordDetailParamVO);

    // 단어 선택 테스트 삭제
    void deleteChoiceRecord(ChoiceRecordDeleteReqVO choiceRecordDeleteReqVO);

    // 검색페이지에서 즐겨찾기 추가
    int registerFavoriteWord(UserFavoriteRegisterReqVO userFavoriteRegisterReqVO);

    // 즐겨찾기 등록 여부 조회
    int checkFavoriteWord(UserFavoriteRegisterReqVO userFavoriteRegisterReqVO);

    // 단답형 단어 테스트 목록 조회
    PageResponse<ShortRecordListResVO> shortTestList(GetRecordListParamVO getRecordListParamVO);

    // 단답형 단어 테스트 결과 상세 조회
    ArrayList<ShortRecordListDetailResVO> shortRecordDetailList(ShortRecordDetailParamVO shortRecordDetailParamVO);
}
