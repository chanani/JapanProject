package com.project.thejapenproject.study.service;

import com.project.thejapenproject.command.UsernameReqVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.study.vo.*;
import com.project.thejapenproject.study.vo.param.*;
import com.project.thejapenproject.test.vo.ChoiceTestSaveReqVO;

import java.util.ArrayList;

public interface StudyService {
    public ArrayList<WordVO> getWord(Integer level, Integer num, String username);

    public int addFavorite(Integer word_num, String username);

    public int deleteFavorite(Integer word_num, String username);

    // 선택 학습 목록 가져오기
    public ArrayList<StudyChoiceResVO> getChoiceList(StudyChoiceParamVO studyChoiceParamVO);

    // 즐겨찾기 여부 확인
    public ArrayList<Integer> getFavoriteCheckList(ResultFavoriteCheckParamVO favoriteVO);

    // 선택 학습 결과 페이지 즐겨찾기 추가 및 삭제
    public void resultAddFavorite(ResultAddFavoriteParamVO favoriteVO);

    // 개인 학습 페이지 단어 검색 및 조회
    public PageResponse<SoloStudyGetSearchDataResVO> getSoleStudySearchData(SoloStudyGetSearchDataParamVO searchVO);

    // 단어 셋트 등록
    public void registerSoloStudy(SoloStudyRegisterReqVO requestVO);

    // 단어 세트 수정
    public void modifySoloStudy(SoloStudyModifyReqVO requestVO);

    // 단어 세트 삭제
    public void removeSoloStudy(SoloStudyRemoveReqVO requestVO);

    // 단어 셋트 목록 조회
    public ArrayList<SoloStudyGetUserListResVO> getSetList(UsernameReqVO usernameReqVO);

    // 단어 셋트 목록 상세 조회
    public ArrayList<GetWordSetDetailListResVO> getSetDetailList(GetWordSetDetailListReqVO requestVO);

    // 단어 세트 수정을 위한 목록 조회
    public GetModifyDataResVO getModifyDataList(GetWordSetDetailListReqVO requestVO);

    // 세트 목록 전체 조회
    public PageResponse<SoloStudyGetUserListResVO> getSetListAll(GetSetStudyDataListParamVO requestVO);

    // 즐겨찾기 목록 조회
    PageResponse<GetFavoriteListResVO> getFavoriteList(GetFavoriteListReqVO requestVO);

    // 단어 세트 목록 좋아요 수정
    void setStudyModifyLike(SetStudyModifyLikeReqVO requestVO);
}
