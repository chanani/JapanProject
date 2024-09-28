package com.project.thejapenproject.common.utils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {

    // 반환할 정보
    private ArrayList<T> content;

    // 페이지 수
    private int page;

    // 페이지의 목록 수
    private int size;

    // 전체 데이터 수
    private long totalElements;

    // 전체 페이지 수
    private int totalPages;

    // 이전 페이지 번호
    private int prePage;

    // 다음 페이지 번호
    private int nextPage;

    // 시작 페이지 번호
    private int navigateFirstPage;

    // 끝 페이지 번호
    private int navigateLastPage;

    @Builder
    public PageResponse(ArrayList<T> content, int page, int size, long totalElements, int totalPages) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;

        // 이전 페이지 계산
        this.prePage = (page > 1) ? page - 1 : 0;

        // 다음 페이지 계산
        this.nextPage = (page < totalPages) ? page + 1 : 0;

        // 시작 페이지는 항상 1
        this.navigateFirstPage = 1;

        // 끝 페이지는 전체 페이지 수
        this.navigateLastPage = totalPages;
    }

}
