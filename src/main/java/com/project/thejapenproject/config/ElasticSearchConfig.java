package com.project.thejapenproject.config;

import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;

@Configuration
public class ElasticSearchConfig {

    @Value("${spring.data.elasticsearch.url}")
    private String url;

    public RestHighLevelClient elasticsearchClient(){
        ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                .connectedTo(url)
                .build();

        return RestClients.create(clientConfiguration).rest();
    }

}
