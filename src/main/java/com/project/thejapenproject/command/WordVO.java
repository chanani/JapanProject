package com.project.thejapenproject.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WordVO {
    private Integer wordNum;
    private Integer wordLevel;
    private String wordMeaning;
    private String wordContent;
    private String wordChinese;
    private boolean wordFavorite;
    private String wordWeek;
}
