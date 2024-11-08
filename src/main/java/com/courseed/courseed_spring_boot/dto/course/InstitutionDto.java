package com.courseed.courseed_spring_boot.dto.course;

import java.io.Serializable;

import com.courseed.courseed_spring_boot.entity.Institution;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstitutionDto implements Serializable {
    private String name;
    private int courses;

    public static InstitutionDto fromEntity(Institution institution) {
        return new InstitutionDto(
            institution.getName(),
            institution.getCourses().size()
        );
    }
}
