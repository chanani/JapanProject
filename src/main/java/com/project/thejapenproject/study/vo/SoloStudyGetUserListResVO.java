package com.project.thejapenproject.study.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SoloStudyGetUserListResVO {

    private String userIconPath;

    private String wsTitle;
    private Integer wsHits;
    private Integer totalCount;
    private Integer wsNum;
    private String username;

    private Integer totalElements;

}
