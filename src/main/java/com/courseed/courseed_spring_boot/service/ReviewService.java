package com.courseed.courseed_spring_boot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.courseed.courseed_spring_boot.dto.review.CreateReviewDto;
import com.courseed.courseed_spring_boot.dto.review.ReviewDto;
import com.courseed.courseed_spring_boot.dto.review.UpdateReviewDto;
import com.courseed.courseed_spring_boot.entity.Course;
import com.courseed.courseed_spring_boot.entity.Review;
import com.courseed.courseed_spring_boot.entity.User;
import com.courseed.courseed_spring_boot.repository.CourseRepository;
import com.courseed.courseed_spring_boot.repository.ReviewRepository;
import com.courseed.courseed_spring_boot.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewService {
    
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public Page<ReviewDto> find(int pageNo, int pageSize, int direction, String orderBy) {
        Sort sort = Sort.by(direction > 0 ? Sort.Direction.ASC : Sort.Direction.DESC, orderBy);
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        return reviewRepository.findAll(pageable).map(ReviewDto::fromEntity);
    }

    public Page<ReviewDto> findByCourse(Long id, int pageSize, int pageNo) {
        Optional<Course> course = courseRepository.findById(id);
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        if (course.isEmpty()) return null;
        return reviewRepository.findByCourse(course.get(), pageable).map(ReviewDto::fromEntity); 
    }

    public List<ReviewDto> findByUsername(String username) {
        Optional<User> users = userRepository.findByUsername(username);

        if (users.isEmpty()) return null;
        return reviewRepository.findByUser(users.get()).stream().map(ReviewDto::fromEntity).toList();
    }

    public ReviewDto findByUsernameAndCourse(String username, Long id) {
        Optional<User> user = userRepository.findByUsername(username);
        Optional<Course> course = courseRepository.findById(id);

        if (user.isEmpty() || course.isEmpty()) return null;

        Optional<Review> review = reviewRepository.findByUserAndCourse(user.get(), course.get());

        return review.isPresent() ? ReviewDto.fromEntity(review.get()) : null;
    }

    public ReviewDto findById(Long id) {
        Optional<Review> reviews = reviewRepository.findById(id);
        
        if (reviews.isEmpty()) return null;
        return ReviewDto.fromEntity(reviews.get());
    }

    public ReviewDto create(CreateReviewDto createReviewDto, String username) {
        Optional<Course> course = courseRepository.findById(createReviewDto.getCourseId());
        Optional<User> user = userRepository.findByUsername(username);

        if (course.isEmpty() || user.isEmpty()) return null;

        Review review = new Review();
        review.setDescription(createReviewDto.getDescription());
        review.setRating(createReviewDto.getRating());
        review.setUser(user.get());
        review.setCourse(course.get());

        Review savedReview = reviewRepository.save(review);
        return ReviewDto.fromEntity(savedReview);
    }
    
    public ReviewDto update(UpdateReviewDto updateReviewDto) {
        Optional<Review> reviews = reviewRepository.findById(updateReviewDto.getId());
        
        if (reviews.isEmpty()) return null;

        Review review = reviews.get();
        review.setDescription(updateReviewDto.getDescription());
        review.setRating(updateReviewDto.getRating());

        Review updatedReview = reviewRepository.save(review);
        return ReviewDto.fromEntity(updatedReview);
    }

    public boolean delete(Long id) {
        Optional<Review> review = reviewRepository.findById(id);

        if (review.isPresent()) {
            reviewRepository.deleteById(id);
            return true;
        } else {
            return false;
        } 
    }
}
