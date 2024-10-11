package com.project.thejapenproject.study.service;

import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.study.vo.ResultFavoriteCheckResVO;
import com.project.thejapenproject.study.vo.StudyChoiceResVO;
import com.project.thejapenproject.study.vo.StudyChoiceExampleVO;
import com.project.thejapenproject.study.vo.param.ResultAddFavoriteParamVO;
import com.project.thejapenproject.study.vo.param.ResultFavoriteCheckParamVO;
import com.project.thejapenproject.study.vo.param.StudyChoiceParamVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service("studyService")
public class StudyServiceImpl implements StudyService {

    @Autowired
    public StudyMapper studyMapper;


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
        } else if(currentCheck > 0) {
            if(studyMapper.resultDeleteFavorite(favoriteVO) < 1){
                throw new OperationErrorException(ErrorCode.FAIL_TO_FAVORITE);
            }
        }
    }


}
