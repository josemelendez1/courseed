package com.courseed.courseed_spring_boot.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.courseed.courseed_spring_boot.entity.Institution;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long> {
    Institution findByName(String name);
    List<Institution> findByNameIn(List<String> names);

    @Query(
        value = """
            SELECT * FROM institutions GROUP BY institutions.id ORDER BY (
                SELECT COUNT(courses.institution_id)
                FROM courses 
                WHERE courses.institution_id = institutions.id
            ) DESC
        """,
        countQuery = "SELECT COUNT(*) FROM institutions",
        nativeQuery = true
    )
    Page<Institution> findInstitutionsByCourses(Pageable pageable);
}
