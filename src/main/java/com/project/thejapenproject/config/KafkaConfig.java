package com.project.thejapenproject.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("spring.kafka")
@Data
public class KafkaConfig {

    private String bootstrapServers;
    private Producer producer;
    private Consumer consumer;
    private Template template;

    @Data
    public static class Producer {
        private String keySerializer;
        private String valueSerializer;
    }

    @Data
    public static class Template {
        private String defaultTopic;
    }

    @Data
    public static class Consumer {
        private String groupId;
        private String enableAutoCommit;
        private String autoOffsetReset;
        private String keyDeserializer;
        private String valueDeserializer;
        private String maxPollRecords;
    }

}
