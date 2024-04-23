package com.project.thejapenproject.common.elasticsearch;

import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestSearchService {
    private final ElasticsearchOperations elasticsearchOperations;
    public void save(TestVO testVO){
        elasticsearchOperations.save(TestDocument.from(testVO));
    }

//    public List<TestVO> searchAddableTests(String keyword, TestVO testVO){
//        return testSearchRepository.findByNicknameContainsIgnoreCase(keyword);
//    }
}
