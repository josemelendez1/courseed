package com.courseed.courseed_spring_boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.courseed.courseed_spring_boot.entity.Category;
import java.util.Optional;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
    List<Category> findByNameIn(List<String> names);
}
