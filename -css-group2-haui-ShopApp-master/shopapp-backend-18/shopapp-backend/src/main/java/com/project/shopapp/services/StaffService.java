package com.project.shopapp.services;

import com.project.shopapp.dtos.UpdateUserDTO;
import com.project.shopapp.dtos.UserDTO;
import com.project.shopapp.exceptions.DataNotFoundException;
import com.project.shopapp.models.User;
import com.project.shopapp.models.Role;
import com.project.shopapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class StaffService implements IStaffService {

    @Autowired
    private UserRepository userRepository;

    // Phương thức tìm kiếm người dùng với phân trang
    @Override
    public Page<User> getUsersWithPagination(String keyword, Pageable pageable) {
        // Tìm kiếm người dùng theo fullname chứa từ khóa (có phân trang)
        return userRepository.findByFullNameContaining(keyword, pageable);
    }

    // Phương thức lấy tất cả người dùng với phân trang
    @Override
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    // Phương thức lấy thông tin người dùng theo ID
    @Override
    public User getUserById(Long userId) throws DataNotFoundException {
        
        // return userRepository.findById(userId)
        //         .orElseThrow(() -> new DataNotFoundException("User not found with id: " + userId));
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new DataNotFoundException("User not found with id: " + userId));

        // Log giá trị createdAt và updatedAt
        System.out.println("User ID: " + user.getId());
        System.out.println("Created At: " + user.getCreatedAt());
        System.out.println("Updated At: " + user.getUpdatedAt());

        return user;
    }

    // Phương thức thêm người dùng mới
    @Override
    public User addUser(UserDTO userDTO) throws Exception {
        // Thực hiện tạo người dùng mới từ DTO
        User user = new User();
        user.setFullName(userDTO.getFullName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setPassword(userDTO.getPassword());  // Giả sử đã mã hóa mật khẩu trước khi lưu
        // Có thể cần thêm logic kiểm tra vai trò hoặc các trường khác
        return userRepository.save(user);
    }

    // Phương thức cập nhật thông tin người dùng
    @Override
    public User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception {
        User user = getUserById(userId);  // Lấy người dùng theo ID

        // Cập nhật thông tin người dùng từ DTO
        user.setFullName(updatedUserDTO.getFullName());
        user.setPhoneNumber(updatedUserDTO.getPhoneNumber());
        user.setAddress(updatedUserDTO.getAddress());
        user.setIsActive(updatedUserDTO.isActive()); 
        //user.setPassword(updatedUserDTO.getPassword());  // Cập nhật mật khẩu mới nếu có
        boolean isActive = updatedUserDTO.isActive(); 
        if ("0".equals(String.valueOf(isActive))) {
            user.setActive(false);
        } else if ("1".equals(String.valueOf(isActive))) {
            user.setActive(true);
        }
        // Lưu lại thông tin đã được cập nhật
        return userRepository.save(user);
    }

    // Phương thức xóa người dùng
    @Override
    public void deleteUser(Long userId) throws DataNotFoundException {
        User user = getUserById(userId);  // Lấy người dùng theo ID
        userRepository.delete(user);  // Xóa người dùng khỏi cơ sở dữ liệu
    }
}
