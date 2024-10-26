package com.courseed.courseed_spring_boot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseed.courseed_spring_boot.dto.course.CourseDto;
import com.courseed.courseed_spring_boot.dto.course.LikeCourseDto;
import com.courseed.courseed_spring_boot.service.CourseService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    
    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<Page<CourseDto>> getCourses (
        @RequestParam(defaultValue = "", required = false) String title,
        @RequestParam(defaultValue = "", required = false) String category,
        @RequestParam(defaultValue = "[]", required = false) List<String> categories,
        @RequestParam(defaultValue = "[]", required = false) List<String> institutions,
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize
    ) 
    {
        Page<CourseDto> courses = courseService.getCourses(pageNo, pageSize, title, categories, institutions);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/liked")
    public ResponseEntity<Page<CourseDto>> getLikedCourses(
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        Page<CourseDto> courses = courseService.getLikedCourses(pageNo, pageSize);
        return new ResponseEntity<>(courses, courses != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/course")
    public ResponseEntity<CourseDto> getCourse(@RequestParam Long id)
    {
        CourseDto course = courseService.getCourse(id);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/likes")
    public ResponseEntity<Page<CourseDto>> getCoursesByLikes(
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        Page<CourseDto> courses = courseService.getCoursesByLikes(pageNo, pageSize);
        return new ResponseEntity<>(courses, courses != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/likes/authenticated")
    public ResponseEntity<Page<CourseDto>> getLikedCoursesByAuthenticatedUser(
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize,
        Authentication authentication
    ) {
        Page<CourseDto> courses = courseService.getLikedCoursesByAuthenticatedUser(authentication, pageNo, pageSize);
        return new ResponseEntity<>(courses, !courses.isEmpty() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/recent")
    public ResponseEntity<Page<CourseDto>> getRecentCourse(
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        return new ResponseEntity<>(courseService.getRecentCourse(pageNo, pageSize), HttpStatus.OK);
    }
    

    @PostMapping("/course/like")
    public ResponseEntity<CourseDto> likeCourse(@Valid @RequestBody LikeCourseDto likeCourseDto, Authentication authentication) {
        CourseDto courseDto = courseService.likeCourse(likeCourseDto, authentication);
        if (courseDto != null) {
            return new ResponseEntity<>(courseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(courseDto, HttpStatus.BAD_REQUEST);
        } 
    }    
}
