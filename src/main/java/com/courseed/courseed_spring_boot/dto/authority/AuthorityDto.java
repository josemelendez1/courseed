package com.courseed.courseed_spring_boot.dto.authority;

import java.io.Serializable;

import com.courseed.courseed_spring_boot.entity.Authority;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorityDto implements Serializable {
    private Long id;
    private String authority;

    public AuthorityDto fromEntity(Authority authority) {
        return new AuthorityDto(
            authority.getId(),
            authority.getAuthority()
        );
    } 
}
