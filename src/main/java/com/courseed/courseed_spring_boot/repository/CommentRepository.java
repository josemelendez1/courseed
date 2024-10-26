package com.courseed.courseed_spring_boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.courseed.courseed_spring_boot.entity.Comment;
import com.courseed.courseed_spring_boot.entity.Course;
import com.courseed.courseed_spring_boot.entity.User;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByCourse(Course course);
    List<Comment> findByUser(User user);
}
