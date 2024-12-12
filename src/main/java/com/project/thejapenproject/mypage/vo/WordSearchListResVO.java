package com.project.thejapenproject.mypage.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * 단어 목록 반환 VO
 *
 * @author chanhan
 * @class : WordSearchListResVO
 * @since 2024-12-06 오후 10:01
 */


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class WordSearchListResVO {

    // 단어 번호
    private Integer wordNum;
    // 단어 뜻
    private String wordMeaning;
    // 단어
    private String wordContent;
    // 한자
    private String wordChinese;
    // 단어 주차
    private String wordWeek;
    // 예문 목록
    private ArrayList<ExampleInfoVO> exampleList;


    // 전체 데이터 수
    private Integer totalElements;

}
