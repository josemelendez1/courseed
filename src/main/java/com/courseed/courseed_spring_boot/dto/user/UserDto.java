package com.courseed.courseed_spring_boot.dto.user;

import java.util.Set;
import java.util.List;

import com.courseed.courseed_spring_boot.dto.course.LikeCourseDto;
import com.courseed.courseed_spring_boot.entity.Authority;
import com.courseed.courseed_spring_boot.entity.User;

import java.io.Serializable;

public class UserDto implements Serializable {
    private String username;
    private String password;
    private Set<Authority> roles;
    private List<LikeCourseDto> likes;

    public UserDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public UserDto() {}
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Authority> getRoles() {
        return roles;
    }

    public void setRoles(Set<Authority> roles) {
        this.roles = roles;
    }

    public List<LikeCourseDto> getLikes() {
        return likes;
    }

    public void setLikes(List<LikeCourseDto> likes) {
        this.likes = likes;
    }

    public static UserDto fromEntity (User user) {
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setRoles(user.getAuthorities());
        userDto.setLikes(user.getInterestedCourses().stream().map(LikeCourseDto::fromEntity).toList());
        return userDto;
    }
}
