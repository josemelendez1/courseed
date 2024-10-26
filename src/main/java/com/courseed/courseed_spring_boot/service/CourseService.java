package com.courseed.courseed_spring_boot.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.courseed.courseed_spring_boot.dto.course.CourseDto;
import com.courseed.courseed_spring_boot.dto.course.LikeCourseDto;
import com.courseed.courseed_spring_boot.entity.Category;
import com.courseed.courseed_spring_boot.entity.Course;
import com.courseed.courseed_spring_boot.entity.Institution;
import com.courseed.courseed_spring_boot.entity.User;
import com.courseed.courseed_spring_boot.repository.CategoryRepository;
import com.courseed.courseed_spring_boot.repository.CourseRepository;
import com.courseed.courseed_spring_boot.repository.InstitutionRepository;
import com.courseed.courseed_spring_boot.repository.UserRepository;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.Arrays;

@Service
@AllArgsConstructor
public class CourseService {
    
    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final InstitutionRepository institutionRepository;
    private final UserRepository userRepository;

    public Page<CourseDto> getCourses(int pageNo, int pageSize, String title, List<String> categoriesNames, List<String> institutionsNames) {
        List<Category> categories = categoryRepository.findByNameIn(categoriesNames);
        List<Long> categoriesIds = categories.stream().map(category -> category.getId()).toList();

        List<Institution> institutions = institutionRepository.findByNameIn(institutionsNames);
        List<Long> institutionsIds = institutions.stream().map(institution -> institution.getId()).toList();

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Course> courses = courseRepository.findByMix(title, categoriesIds, institutionsIds, pageable);
        Page<CourseDto> coursesDto = courses.map(CourseDto::fromEntity);

        return coursesDto;
    }

    public CourseDto getCourse(Long id) {
        List<CourseDto> courses = courseRepository.findById(id).stream().map(CourseDto::fromEntity).toList();
        if (!courses.isEmpty()) {
            return courses.get(0);
        } else {
            return null;
        }
    }

    public Page<CourseDto> getRecentCourse(int PageNo, int pageSize) {
        return courseRepository.findAll(PageRequest.of(PageNo, pageSize, Sort.by("id").descending())).map(CourseDto::fromEntity);
    }

    public CourseDto likeCourse(LikeCourseDto likeCourseDto, Authentication authentication) {
        Optional<User> users = userRepository.findByUsername(authentication.getName());
        
        if (users.isEmpty()) return null;
        
        User user = users.get();
        Course course = courseRepository.findById(likeCourseDto.getCourseId()).get();
        
        List<Course> interestCourses = user.getInterestedCourses();

        if (likeCourseDto.isLike()) {
            if (!interestCourses.stream().anyMatch(c -> course.getId().equals(c.getId()))) {
                user.getInterestedCourses().add(course);
            }
        } else {
            if (interestCourses.stream().anyMatch(c -> course.getId().equals(c.getId()))) {
                user.getInterestedCourses().removeIf(c -> course.getId().equals(c.getId()));
            }
        }

        userRepository.save(user);
        
        return CourseDto.fromEntity(course);
    }
    
    public Page<CourseDto> getCoursesByLikes(int pageNo, int pageSize) {
        Page<Course> courses = courseRepository.findOrderByLikeCount(PageRequest.of(pageNo, pageSize));
        return courses.map(CourseDto::fromEntity);
    }

    public Optional<Course> findById(Long id) {
        return courseRepository.findById(id);
    }

    public Page<CourseDto> getLikedCourses(int pageNo, int pageSize) {
        return courseRepository.findLikedCourses(PageRequest.of(pageNo, pageSize)).map(CourseDto::fromEntity);
    }

    public Page<CourseDto> getLikedCoursesByAuthenticatedUser(Authentication authentication, int pageNo, int pageSize) {
        Optional<User> users = userRepository.findByUsername(authentication.getName());
        
        if (users.isEmpty()) return null;
        
        User user = users.get();
        Page<Course> courses = courseRepository.findByInterestedUsers(Arrays.asList(user), PageRequest.of(pageNo, pageSize));
        return courses.map(CourseDto::fromEntity);
    }
}
