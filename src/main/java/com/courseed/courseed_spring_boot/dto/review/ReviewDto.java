package com.courseed.courseed_spring_boot.dto.review;

import java.io.Serializable;
import java.time.LocalDateTime;
import com.courseed.courseed_spring_boot.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto implements Serializable {
    private Long id;
    private String description;
    private int rating;
    private String username;
    private Long courseId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ReviewDto fromEntity(Review review) {
        return new ReviewDto(
            review.getId(),
            review.getDescription(),
            review.getRating(),
            review.getUser().getUsername(),
            review.getCourse().getId(),
            review.getCreatedAt(),
            review.getUpdatedAt()
        );
    }
}
