package com.courseed.courseed_spring_boot.controller;

import org.springframework.web.bind.annotation.RestController;

import com.courseed.courseed_spring_boot.dto.review.CreateReviewDto;
import com.courseed.courseed_spring_boot.dto.review.DeleteReviewDto;
import com.courseed.courseed_spring_boot.dto.review.ReviewDto;
import com.courseed.courseed_spring_boot.dto.review.UpdateReviewDto;
import com.courseed.courseed_spring_boot.service.ReviewService;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public ResponseEntity<Page<ReviewDto>> getReviews(
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize,
        @RequestParam(defaultValue = "rating") String orderBy,
        @RequestParam(defaultValue = "1") int direction
    ) {
        Page<ReviewDto> reviews = reviewService.find(pageNo, pageSize, direction, orderBy);
        return new ResponseEntity<>(reviews, reviews != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    
    @GetMapping("/course/auth")
    public ResponseEntity<ReviewDto> getReviewByUser(
        @RequestParam(required = true) Long id,
        Authentication authentication
    ) {
        ReviewDto review = reviewService.findByUsernameAndCourse(authentication.getName(), id);
        return new ResponseEntity<>(review, review != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/course")
    public ResponseEntity<Page<ReviewDto>> getReviewsByCourse(
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize,
        @RequestParam(required = true) Long id
    ) {
        Page<ReviewDto> reviews = reviewService.findByCourse(id, pageSize, pageNo);
        return new ResponseEntity<>(reviews, reviews != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/create")
    public ResponseEntity<ReviewDto> create(@RequestBody @Valid CreateReviewDto createReviewDto, Authentication authentication) {
        ReviewDto review = reviewService.create(createReviewDto, authentication.getName());
        return new ResponseEntity<>(review, review != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update")
    public ResponseEntity<ReviewDto> update(@RequestBody @Valid UpdateReviewDto updateReviewDto) {
        ReviewDto review = reviewService.update(updateReviewDto);
        return new ResponseEntity<>(review, review != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody @Valid DeleteReviewDto deleteReviewDto) {
        boolean isDeleted = reviewService.delete(deleteReviewDto.getId());
        return new ResponseEntity<>(
            isDeleted ? "Reseña eliminada con éxito" : "Reseña no encontrada.", 
            isDeleted ? HttpStatus.OK : HttpStatus.BAD_REQUEST
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
