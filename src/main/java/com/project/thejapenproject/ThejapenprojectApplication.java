package com.project.thejapenproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ThejapenprojectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ThejapenprojectApplication.class, args);
    }

}
