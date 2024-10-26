package com.courseed.courseed_spring_boot.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.courseed.courseed_spring_boot.entity.Course;
import java.util.List;
import com.courseed.courseed_spring_boot.entity.User;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    @Query(
        value = """
            SELECT * FROM courses WHERE courses.title LIKE CONCAT('%', ?1, '%') 
            AND (COALESCE(?2) IS NULL OR courses.category_id IN (?2))
            AND (COALESCE(?3) IS NULL OR courses.institution_id IN (?3))
            ORDER BY courses.title
        """, 
        nativeQuery = true
    )
    Page<Course> findByMix(String title, List<Long> categories, List<Long> institutions, Pageable pageable);

    @Query(
        value = """
                SELECT * FROM courses GROUP BY courses.id ORDER BY (
                    SELECT COUNT(courses_of_my_interest.course_id) 
                    FROM courses_of_my_interest
                    WHERE courses_of_my_interest.course_id = courses.id
                ) DESC
            """,
        countQuery = "SELECT COUNT(*) FROM courses",
        nativeQuery = true
    )
    Page<Course> findOrderByLikeCount(Pageable pageable);

    @Query(
        value = """
            SELECT DISTINCT courses.* FROM courses INNER JOIN courses_of_my_interest ON courses.id = courses_of_my_interest.course_id
            """,
        nativeQuery = true
    )
    Page<Course> findLikedCourses(Pageable pageable);

    List<Course> findByTitle(String title);

    Page<Course> findByInterestedUsers(List<User> interestedUsers, Pageable pageable);
}
