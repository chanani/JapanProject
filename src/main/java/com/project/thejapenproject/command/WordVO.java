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

    private Integer word_num;
    private Integer word_level;
    private String word_meaning;
    private String word_content;

}
