package com.project.thejapenproject.command;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "번호")
    private int school_num;

    @Schema(description = "주차")
    private int school_week;

    @Schema(description = "뜻")
    private String school_meaning;

    @Schema(description = "내용")
    private String school_content;

    @Schema(description = "한자")
    private String school_chinese;
}
