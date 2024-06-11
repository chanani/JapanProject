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
    private int School_num;
    private int School_week;
    private String School_meaning;
    private String School_content;
}
