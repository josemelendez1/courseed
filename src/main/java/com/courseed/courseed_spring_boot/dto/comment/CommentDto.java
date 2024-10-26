package com.courseed.courseed_spring_boot.dto.comment;

import java.time.LocalDateTime;

import com.courseed.courseed_spring_boot.dto.course.CourseDto;
import com.courseed.courseed_spring_boot.dto.user.UserDto;
import com.courseed.courseed_spring_boot.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private String content;
    private UserDto userDto;
    private CourseDto courseDto;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static CommentDto fromEntity (Comment comment) {
        return new CommentDto(
            comment.getContent(),
            UserDto.fromEntity(comment.getUser()),
            CourseDto.fromEntity(comment.getCourse()),
            comment.getCreatedAt(),
            comment.getUpdatedAt()
        );
    }
}
