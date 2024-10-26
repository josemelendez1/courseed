package com.courseed.courseed_spring_boot.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.courseed.courseed_spring_boot.dto.comment.CommentDto;
import com.courseed.courseed_spring_boot.dto.comment.CreateCommentDto;
import com.courseed.courseed_spring_boot.dto.comment.DeleteCommentDto;
import com.courseed.courseed_spring_boot.dto.comment.UpdateCommentDto;
import com.courseed.courseed_spring_boot.entity.Comment;
import com.courseed.courseed_spring_boot.entity.Course;
import com.courseed.courseed_spring_boot.entity.User;
import com.courseed.courseed_spring_boot.repository.CommentRepository;
import com.courseed.courseed_spring_boot.repository.CourseRepository;
import com.courseed.courseed_spring_boot.repository.UserRepository;

import lombok.AllArgsConstructor;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CommentService {
    
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public Page<CommentDto> getComments(int pageNo, int pageSize) {
        return commentRepository.findAll(PageRequest.of(pageNo, pageSize)).map(CommentDto::fromEntity);
    }

    public CommentDto createComment(CreateCommentDto createCommentDto, Authentication authentication) {
        Optional<Course> courses = courseRepository.findById(createCommentDto.getCourseId());
        Optional<User> users = userRepository.findByUsername(authentication.getName());

        if (courses.isPresent() && users.isPresent()) {
            Comment comment = new Comment();
            comment.setContent(createCommentDto.getContent());
            comment.setCourse(courses.get());
            comment.setUser(users.get());

            Comment savedComment = commentRepository.save(comment);

            return CommentDto.fromEntity(savedComment);
        } else {
            return null;
        }
    }

    public CommentDto updateComment(UpdateCommentDto updateCommentDto) {
        Optional<Comment> comments = commentRepository.findById(updateCommentDto.getCommentId());
        
        if (comments.isPresent()) {
            Comment comment = comments.get();
            comment.setContent(updateCommentDto.getContent());

            Comment updatedComment = commentRepository.save(comment);

            return CommentDto.fromEntity(updatedComment);
        } else {
            return null;
        }
    }

    public void deleteComment(DeleteCommentDto deleteCommentDto) {
        commentRepository.deleteById(deleteCommentDto.getCommentId());
    }

    public Optional<Comment> findById(Long id) {
        return commentRepository.findById(id);
    }
}
