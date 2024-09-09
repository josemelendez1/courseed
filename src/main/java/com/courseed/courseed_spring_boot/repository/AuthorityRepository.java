package com.courseed.courseed_spring_boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.courseed.courseed_spring_boot.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByAuthority(String authority);
}