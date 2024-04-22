package com.project.thejapenproject.common.elasticsearch;

import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestSearchService {
    private final ElasticsearchOperations elasticsearchOperations;

    public void save(TestVO testVO){
        elasticsearchOperations.save(TestDocument.from(testVO));
    }
}
