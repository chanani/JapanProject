package com.project.thejapenproject.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddWordListVO {

    // 단어
    private String wordContent;
    // 뜻
    private String wordMeaning;
    // 레벨
    private Integer wordLevel = 1;
    // 한자
    private String wordChinese;
    // 주차
    private Integer wordWeek = 0;
    // 예제 목록
    private ArrayList<WordExampleInfoVO> exampleList;

    // 단어 번호 : 단어 등록 후 selectKey로 조회해서 예제 등록에 사용
    private Integer wordNum;

}
