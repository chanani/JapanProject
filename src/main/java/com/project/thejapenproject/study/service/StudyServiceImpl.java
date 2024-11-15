package com.project.thejapenproject.study.service;

import com.project.thejapenproject.command.UsernameReqVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.study.vo.*;
import com.project.thejapenproject.study.vo.param.*;
import com.project.thejapenproject.test.vo.ChoiceTestSaveReqVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service("studyService")
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService {

    public final StudyMapper studyMapper;

    @Override
    public ArrayList<WordVO> getWord(Integer level, Integer num, String username) {
        return studyMapper.getWord(level, num, username);
    }

    @Override
    public int addFavorite(Integer word_num, String username) {
        return studyMapper.addFavorite(word_num, username);
    }

    @Override
    public int deleteFavorite(Integer word_num, String username) {
        return studyMapper.deleteFavorite(word_num, username);
    }

    // 선택 학습 단어 조회
    @Override
    public ArrayList<StudyChoiceResVO> getChoiceList(StudyChoiceParamVO studyChoiceParamVO) {
        // 단어 조회(일치하는 단어)
        ArrayList<StudyChoiceResVO> choiceList = studyMapper.getChoiceList(studyChoiceParamVO);

        // 예제 단어 조회(일치하지 않는 단어)
        for (StudyChoiceResVO choice : choiceList) {
            // 선택된 단어의 번호를 기반으로 예제 단어를 가져옴
            ArrayList<StudyChoiceExampleVO> exampleData = studyMapper.getChoiceExampleData(choice.getWordNum());

            // 예제 단어 데이터를 choice 객체에 설정
            ArrayList<String> wordContentList = new ArrayList<>();

            // 히라가나에 한자 추가하기
            for (StudyChoiceExampleVO example : exampleData) {
                String wordContent = example.getWordContent();
                if (!example.getWordChinese().equals("")) {
                    wordContent += "(" + example.getWordChinese() + ")";
                }
                wordContentList.add(wordContent);
            }

            // 정답 추가
            String wordContent = choice.getWordContent();
            if (!choice.getWordChinese().equals("")) {
                wordContent += "(" + choice.getWordChinese() + ")";
            }
            wordContentList.add(wordContent);

            // 정답과 예제 단어들을 랜덤으로 섞기
            List<Integer> indices = IntStream.range(0, wordContentList.size()).boxed().collect(Collectors.toList());
            Collections.shuffle(indices);  // 인덱스 랜덤 섞기

            ArrayList<String> shuffledWordContentList = new ArrayList<>();

            for (int index : indices) {
                shuffledWordContentList.add(wordContentList.get(index));
            }

            // 각 choice 객체에 설정
            choice.setWordContentList(shuffledWordContentList);
        }

        return choiceList;
    }

    // 즐겨찾기 여부 조회
    @Override
    public ArrayList<Integer> getFavoriteCheckList(ResultFavoriteCheckParamVO favoriteVO) {
        return studyMapper.getFavoriteCheckList(favoriteVO);
    }

    // 선택 학습 결과 페이지 즐겨찾기 추가 및 삭제
    @Override
    public void resultAddFavorite(ResultAddFavoriteParamVO favoriteVO) {
        Integer currentCheck = studyMapper.currentFavoriteCheck(favoriteVO);
        if (currentCheck == 0) {
            if (studyMapper.resultAddFavorite(favoriteVO) < 1) {
                throw new OperationErrorException(ErrorCode.FAIL_TO_FAVORITE);
            }
        } else if (currentCheck > 0) {
            if (studyMapper.resultDeleteFavorite(favoriteVO) < 1) {
                throw new OperationErrorException(ErrorCode.FAIL_TO_FAVORITE);
            }
        }
    }


    // 개인 학습 페이지 단어 검색 및 조회
    @Override
    public PageResponse<SoloStudyGetSearchDataResVO> getSoleStudySearchData(SoloStudyGetSearchDataParamVO searchVO) {
        Integer page = searchVO.getPage();
        Integer size = searchVO.getSize();
        searchVO.setOffset((page - 1) * size);

        // 목록 조회
        ArrayList<SoloStudyGetSearchDataResVO> wordList = studyMapper.getSoleStudySearchData(searchVO);

        // 총 데이터 수 계산
        int totalElements = wordList.size() != 0 ? wordList.get(0).getTotalElements() : 0;
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        PageResponse<SoloStudyGetSearchDataResVO> responseData = PageResponse.<SoloStudyGetSearchDataResVO>builder()
                .content(wordList)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
        return responseData;
    }


    // 단어 세트 등록
    @Override
    @Transactional
    public void registerSoloStudy(SoloStudyRegisterReqVO requestVO) {
        // word_set 테이블 insert
        int insertResult = studyMapper.wordSetInsert(requestVO);
        // word_set_detail 테이블 insert
        int detailInsertResult = studyMapper.wordSetDetailInsert(requestVO);

        if (insertResult < 1 || detailInsertResult < 1) {
            throw new OperationErrorException(ErrorCode.FAIL_TO_SET_REGISTER);
        }
    }

    // 단어 세트 수정
    @Override
    public void modifySoloStudy(SoloStudyModifyReqVO requestVO) {
        // 단어 세트 수정 시 상세 내역 삭제
        int detailDeleteResult = studyMapper.wordSetDetailDelete(requestVO);
        int detailModifyResult = studyMapper.wordSetDetailModify(requestVO);
        if (detailModifyResult < 1 || detailDeleteResult < 1) {
            throw new OperationErrorException(ErrorCode.FAIL_TO_SET_MODIFY);
        }
    }

    // 단어 세트 삭제
    @Override
    public void removeSoloStudy(SoloStudyRemoveReqVO requestVO) {
        if (studyMapper.wordSetRemove(requestVO) < 1) {
            throw new OperationErrorException(ErrorCode.FAIL_TO_SET_REMOVE);
        }
    }

    // 단어 셋트 목록 조회
    @Override
    public ArrayList<SoloStudyGetUserListResVO> getSetList(UsernameReqVO usernameReqVO) {
        return studyMapper.getSetList(usernameReqVO);
    }

    // 단어 셋트 목록 상세 조회
    @Override
    public ArrayList<GetWordSetDetailListResVO> getSetDetailList(GetWordSetDetailListReqVO requestVO) {
        return studyMapper.getSetDetailList(requestVO);
    }

    // 단어 세트 수정을 위한 목록 조회
    @Override
    public GetModifyDataResVO getModifyDataList(GetWordSetDetailListReqVO requestVO) {
        GetModifyDataResVO data = studyMapper.getModifyDataList(requestVO);
        ArrayList<WordInfo> list = studyMapper.getModifyDataDetailList(requestVO);
        data.setWordList(list);
        return data;
    }

    // 세트 목록 전체 조회
    @Override
    public PageResponse<SoloStudyGetUserListResVO> getSetListAll(GetSetStudyDataListParamVO requestVO) {
        Integer page = requestVO.getPage();
        Integer size = requestVO.getSize();
        requestVO.setOffset((page - 1) * size);

        // 목록 조회
        ArrayList<SoloStudyGetUserListResVO> setList = studyMapper.getSetListAll(requestVO);

        // 총 데이터 수 계산
        int totalElements = setList.size() != 0 ? setList.get(0).getTotalElements() : 0;
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        PageResponse<SoloStudyGetUserListResVO> responseData = PageResponse.<SoloStudyGetUserListResVO>builder()
                .content(setList)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
        return responseData;
    }

    // 즐겨찾기 목록 조회
    @Override
    public PageResponse<GetFavoriteListResVO> getFavoriteList(GetFavoriteListReqVO requestVO) {
        Integer page = requestVO.getPage();
        Integer size = requestVO.getSize();
        requestVO.setOffset((page - 1) * size);

        // 목록 조회
        ArrayList<GetFavoriteListResVO> favoriteList = studyMapper.getFavoriteList(requestVO);

        // 총 데이터 수 계산
        int totalElements = favoriteList.size() != 0 ? favoriteList.get(0).getTotalElements() : 0;
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        PageResponse<GetFavoriteListResVO> responseData = PageResponse.<GetFavoriteListResVO>builder()
                .content(favoriteList)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
        return responseData;
    }

    // 단어 세트 목록 좋아요 수정
    @Override
    @Transactional
    public void setStudyModifyLike(SetStudyModifyLikeReqVO requestVO) {
        // 좋아요 누른 상태인지 확인
        int likeState = studyMapper.getLikeState(requestVO);
        requestVO.setLikeState(likeState);

        switch (likeState){
            case 0 : {
                // 좋아요 누르지 않았을 경우 좋아요 등록
                if(studyMapper.setStudyRegisterLike(requestVO) < 1){
                    throw new OperationErrorException(ErrorCode.FAIL_TO_MODIFY_LIKE);
                }
                break;
            }
            case 1 : {
                // 좋아요 누른 상태일 경우 취소
                if(studyMapper.setStudyModifyLike(requestVO) < 1){
                    throw new OperationErrorException(ErrorCode.FAIL_TO_MODIFY_LIKE);
                }
                break;
            }
        }

        // 누적 좋아요 업데이트
        if(studyMapper.setStudyHitsUpdate(requestVO) < 1){
            throw new OperationErrorException(ErrorCode.FAIL_TO_MODIFY_LIKE);
        }





    }


}
