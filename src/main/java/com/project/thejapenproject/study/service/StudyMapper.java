package com.project.thejapenproject.study.service;

import com.project.thejapenproject.command.UsernameReqVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.mainpage.vo.FavoriteNotesListResVO;
import com.project.thejapenproject.study.vo.*;
import com.project.thejapenproject.study.vo.param.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface StudyMapper {
    public ArrayList<WordVO> getWord(@Param("level") Integer level, @Param("num") Integer num, @Param("username") String username);
    public int addFavorite(@Param("word_num") Integer word_num, @Param("username") String username);
    public int deleteFavorite(@Param("word_num")Integer word_num, @Param("username") String username);

    // 선택 학습 단어 가져오기
    public ArrayList<StudyChoiceResVO> getChoiceList(StudyChoiceParamVO studyChoiceParamVO);

    // 선택 학습 예제 단어 가져오기
    public ArrayList<StudyChoiceExampleVO> getChoiceExampleData(Integer wordNum);

    // 즐겨찾기 여부 조회
    public ArrayList<Integer> getFavoriteCheckList(ResultFavoriteCheckParamVO favoriteVO);

    // 현재 즐겨 찾기 여부 확인
    public int currentFavoriteCheck(ResultAddFavoriteParamVO favoriteVO);

    // 선택 학습 결과 페이지 즐겨찾기 추가
    public int resultAddFavorite(ResultAddFavoriteParamVO favoriteVO);

    // 선택 학습 결과 페이지 즐겨찾기 삭제
    public int resultDeleteFavorite(ResultAddFavoriteParamVO favoriteVO);

    // 개인 학습 페이지 단어 검색 및 조회
    public ArrayList<SoloStudyGetSearchDataResVO> getSoleStudySearchData(SoloStudyGetSearchDataParamVO searchVO);

    // 세트 단어 등록
    public int wordSetInsert(SoloStudyRegisterReqVO requestVO);

    // 세트 단어 상세 내용 등록
    public int wordSetDetailInsert(SoloStudyRegisterReqVO requestVO);

    // 단어 세트 상세 내역 삭제(수정 시)
    public int wordSetDetailDelete(SoloStudyModifyReqVO requestVO);

    // 단어 세트 상세 내역 등록(수정 시)
    public int wordSetDetailModify(SoloStudyModifyReqVO requestVO);

    // 단어 세트 삭제
    public int wordSetRemove(SoloStudyRemoveReqVO requestVO);

    // 단어 세트 목록 조회
    public ArrayList<SoloStudyGetUserListResVO> getSetList(GetSetDataReqVO getSetDataReqVO);

    // 단어 세트 목록 상세 조회
    public ArrayList<GetWordSetDetailListResVO> getSetDetailList(GetWordSetDetailListReqVO requestVO);

    // 단어 세트 수정을 위한 목록 조회
    public GetModifyDataResVO getModifyDataList(GetWordSetDetailListReqVO requestVO);

    // 단어 세트 수정을 위한 상세 단어 목록 조회
    public ArrayList<WordInfo> getModifyDataDetailList(GetWordSetDetailListReqVO requestVO);

    // 단어 세트 전체 목록 조회
    public ArrayList<SoloStudyGetUserListResVO> getSetListAll(GetSetStudyDataListParamVO requestVO);

    // 즐겨찾기 목록 조회
    ArrayList<GetFavoriteListResVO> getFavoriteList(GetFavoriteListReqVO requestVO);

    // 단어 세트 목록 좋아요 수정
    int setStudyModifyLike(SetStudyModifyLikeReqVO requestVO);

    // 좋아요 여부 확인
    Integer getLikeState(SetStudyModifyLikeReqVO requestVO);

    // 좋아요 등록
    int setStudyRegisterLike(SetStudyModifyLikeReqVO requestVO);

    // 누적 좋아요 수정
    int setStudyHitsUpdate(SetStudyModifyLikeReqVO requestVO);

    // 인기 단어장 목록 조회
    ArrayList<FavoriteNotesListResVO> getFavoriteNoteList();


}
