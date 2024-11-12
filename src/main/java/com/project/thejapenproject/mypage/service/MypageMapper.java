package com.project.thejapenproject.mypage.service;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.mypage.vo.*;
import com.project.thejapenproject.mypage.vo.param.ChoiceRecordDetailParamVO;
import com.project.thejapenproject.mypage.vo.param.FavoriteListVO;
import com.project.thejapenproject.mypage.vo.param.GetRecordListParamVO;
import com.project.thejapenproject.mypage.vo.param.ShortRecordDetailParamVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface MypageMapper {
    public ArrayList<FavoriteListResVO> favoriteList(FavoriteListVO favoriteListVO);
    public ArrayList<RecordDetailsVO> recordDetails(GetRecordDetailsReqVO getRecordDetailsReqVO);
    public UserMypageResVO myInfo(String username);
    public int modifyInfo(UserInfoModifyReqVO userInfoModifyReqVO);
    public int withdrawal(String username);
    public int deleteShortRecord(int strNum);
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

    // 단어 선택 테스트 삭제
    int deleteChoiceRecord(ChoiceRecordDeleteReqVO choiceRecordDeleteReqVO);

    // 검색페이지에서 즐겨찾기 추가
    int registerFavoriteWord(UserFavoriteRegisterReqVO userFavoriteRegisterReqVO);

    // 즐겨찾기 등록 여부 조회
    int checkFavoriteWord(UserFavoriteRegisterReqVO userFavoriteRegisterReqVO);

    // 단답형 단어 테스트 목록 조회
    ArrayList<ShortRecordListResVO> shortTestList(GetRecordListParamVO getRecordListParamVO);

    // 단답형 단어 테스트 결과 상세 조회
    ArrayList<ShortRecordListDetailResVO> shortRecordDetailList(ShortRecordDetailParamVO shortRecordDetailParamVO);

    // 즐겨찾기 메모 등록
    int updateFavoriteMemo(updateFavoriteMemoReqVO updateFavoriteMemoReqVO);
}
