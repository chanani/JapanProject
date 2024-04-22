package com.project.thejapenproject.common.elasticsearch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "test_index")
public class TestDocument {

    @Id
    private String name;
    private String message;

    public static TestDocument from(TestVO testVO){
        return TestDocument.builder()
                .name(testVO.getName())
                .message(testVO.getMessage())
                .build();
    }
}
