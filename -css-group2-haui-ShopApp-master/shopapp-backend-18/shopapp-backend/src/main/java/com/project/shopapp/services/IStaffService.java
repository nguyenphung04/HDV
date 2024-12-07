package com.project.shopapp.services;

import com.project.shopapp.dtos.UpdateUserDTO;
import com.project.shopapp.dtos.UserDTO;
import com.project.shopapp.exceptions.DataNotFoundException;
import com.project.shopapp.models.User;
import com.project.shopapp.models.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IStaffService {

    Page<User> getUsersWithPagination(String keyword, Pageable pageable);
    Page<User> getAllUsers(Pageable pageable); 
    User getUserById(Long userId) throws DataNotFoundException; 
    User addUser(UserDTO userDTO) throws Exception; 
    User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception; 
    void deleteUser(Long userId) throws DataNotFoundException; 
}
