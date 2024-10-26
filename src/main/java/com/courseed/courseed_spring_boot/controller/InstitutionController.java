package com.courseed.courseed_spring_boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseed.courseed_spring_boot.dto.course.InstitutionDto;
import com.courseed.courseed_spring_boot.service.InstitutionService;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/institutions")
public class InstitutionController {
    
    @Autowired
    private InstitutionService institutionService;

    @GetMapping
    public ResponseEntity<List<InstitutionDto>> getInstitutions() {

        List<InstitutionDto> institutions = institutionService.getInstitutions();

        return ResponseEntity.ok(institutions);
    }

    @GetMapping("/courses")
    public ResponseEntity<Page<InstitutionDto>> getInstitutionsByCourses(
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        Page<InstitutionDto> institutions = institutionService.getInstitutionsByCourses(pageNo, pageSize);
        return new ResponseEntity<>(institutions, institutions != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
}
