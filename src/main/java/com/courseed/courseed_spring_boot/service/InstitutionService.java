package com.courseed.courseed_spring_boot.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.courseed.courseed_spring_boot.dto.course.InstitutionDto;
import com.courseed.courseed_spring_boot.entity.Institution;
import com.courseed.courseed_spring_boot.repository.InstitutionRepository;

import lombok.AllArgsConstructor;
import java.util.List;

@Service
@AllArgsConstructor
public class InstitutionService {
    
    private final InstitutionRepository institutionRepository;

    public List<InstitutionDto> getInstitutions() {
        return institutionRepository.findAll().stream().map(InstitutionDto::fromEntity).toList();
    }

    public List<Institution> getInstitutionsByNameIn(List<String> names) {
        return institutionRepository.findByNameIn(names);
    }

    public Page<InstitutionDto> getInstitutionsByCourses(int pageNo, int pageSize) {
        return institutionRepository.findInstitutionsByCourses(PageRequest.of(pageNo, pageSize)).map(InstitutionDto::fromEntity);
    }
}
