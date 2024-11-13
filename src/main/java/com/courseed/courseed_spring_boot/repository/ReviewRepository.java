package com.courseed.courseed_spring_boot.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.courseed.courseed_spring_boot.entity.Course;
import com.courseed.courseed_spring_boot.entity.Review;
import com.courseed.courseed_spring_boot.entity.User;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUser(User user);
    Page<Review> findByCourse(Course course, Pageable pageable);
    Optional<Review> findByUserAndCourse(User user, Course course);
}