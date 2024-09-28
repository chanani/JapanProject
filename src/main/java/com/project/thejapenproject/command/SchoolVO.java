package com.project.thejapenproject.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class SchoolVO {
    private int school_num;
    private int school_week;
    private String school_meaning;
    private String school_content;
    private String school_chinese;
}
