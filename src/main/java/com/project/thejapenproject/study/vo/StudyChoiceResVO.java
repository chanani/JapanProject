package com.project.thejapenproject.study.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudyChoiceResVO {

    // 단어 번호
    private Integer wordNum;

    // 뜻
    private String wordMeaning;

    // 히라가나 정답
    private String wordContent;

    // 한자 정답
    private String wordChinese;

    // 예제 목록 + 정답 포함
    private ArrayList<String> wordContentList;

}
