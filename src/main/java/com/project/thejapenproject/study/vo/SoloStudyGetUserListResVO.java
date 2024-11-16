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

    private String userIconPath; // 유저 아이콘 정보
    private String wsTitle; // 제목
    private Integer wsHits; // 좋아요 수
    private Integer totalCount; // 단어 수
    private Integer wsNum; // 단어 세트 고유 번호
    private String username; // 유저 아이디
    private Integer totalElements; // 총 게시글 수
    private boolean favorite; // 단어 세트 목록 좋아요 여부

}
