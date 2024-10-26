package com.courseed.courseed_spring_boot.controller;

import com.courseed.courseed_spring_boot.dto.comment.CommentDto;
import com.courseed.courseed_spring_boot.dto.comment.CreateCommentDto;
import com.courseed.courseed_spring_boot.dto.comment.DeleteCommentDto;
import com.courseed.courseed_spring_boot.dto.comment.UpdateCommentDto;
import com.courseed.courseed_spring_boot.service.CommentService;

import jakarta.validation.Valid;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public ResponseEntity<Page<CommentDto>> getComments(
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        Page<CommentDto> comments = commentService.getComments(pageNo, pageSize);
        return new ResponseEntity<>(comments, comments != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PostMapping
    public ResponseEntity<CommentDto> create(@Valid @RequestBody CreateCommentDto createCommentDto, Authentication authentication) {
        CommentDto comment = commentService.createComment(createCommentDto, authentication);

        return new ResponseEntity<>(comment, comment != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update")
    public ResponseEntity<CommentDto> update(@Valid @RequestBody UpdateCommentDto updateCommentDto) {
        CommentDto comment = commentService.updateComment(updateCommentDto);
        
        return new ResponseEntity<>(comment, comment != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@Valid @RequestBody DeleteCommentDto deleteCommentDto) {
        commentService.deleteComment(deleteCommentDto);
        return new ResponseEntity<>(HttpStatus.OK);
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
