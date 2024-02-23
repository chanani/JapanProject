package com.project.thejapenproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/")
public class MainController {

    @RequestMapping("/z")
    public List<String> test(String s){
        return Arrays.asList("인사");
    }
}
