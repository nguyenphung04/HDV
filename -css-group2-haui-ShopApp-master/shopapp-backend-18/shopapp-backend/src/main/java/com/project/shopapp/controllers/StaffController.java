    package com.project.shopapp.controllers;

    import com.project.shopapp.models.User;
    import com.project.shopapp.responses.UserResponse;
    import com.project.shopapp.services.IStaffService;
    import jakarta.validation.Valid;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.PageRequest;
    import org.springframework.data.domain.Pageable;
    import org.springframework.web.bind.annotation.*;
    import com.project.shopapp.dtos.*;
    import lombok.RequiredArgsConstructor;

    @RestController
    @RequestMapping("${api.prefix}/staff")
    @RequiredArgsConstructor
    public class StaffController {

        private final IStaffService staffService;

        // Hiển thị danh sách người dùng (có phân trang)
        @GetMapping("/get-staffs-by-keyword")
        public ResponseEntity<Page<UserResponse>> getUsers(
                @RequestParam(defaultValue = "") String keyword,
                @RequestParam(defaultValue = "0") int page,
                @RequestParam(defaultValue = "10") int limit
        ) {
            Pageable pageable = PageRequest.of(page, limit);
            Page<User> users = staffService.getUsersWithPagination(keyword, pageable);
            Page<UserResponse> userResponses = users.map(UserResponse::fromUser);
            System.out.println("Number of users found: " + userResponses.getTotalElements());
            return ResponseEntity.ok(userResponses);
        }

        // Thêm người dùng mới
        @PostMapping("/add")
        public ResponseEntity<UserResponse> addUser(@Valid @RequestBody UserDTO userDTO) {
            try {
                User newUser = staffService.addUser(userDTO);
                return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.fromUser(newUser));
            } catch (Exception e) {
                // Xử lý ngoại lệ, ví dụ: trả về lỗi khi có vấn đề xảy ra
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }
        // Cập nhật thông tin người dùng
        @PutMapping("/{id}")
        public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO updateUserDTO) {
            try {
                // Kiểm tra và chỉ cập nhật mật khẩu nếu có giá trị mới
                if (updateUserDTO.getPassword() == null || updateUserDTO.getPassword().isEmpty()) {
                    // Nếu không có mật khẩu mới, bỏ qua trường mật khẩu
                    updateUserDTO.setPassword(null);
                }
        
                User updatedUser = staffService.updateUser(id, updateUserDTO);
                return ResponseEntity.ok(UserResponse.fromUser(updatedUser));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }
        
        // Xóa người dùng
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
            try {
                staffService.deleteUser(id);
                return ResponseEntity.noContent().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }

        // Lấy chi tiết người dùng
        @GetMapping("/{id}")
        public ResponseEntity<UserResponse> getUserDetails(@PathVariable Long id) {
            System.out.println("Received user ID: " + id);
            try {
                User user = staffService.getUserById(id);
                return ResponseEntity.ok(UserResponse.fromUser(user));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }
    }
