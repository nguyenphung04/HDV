package com.project.shopapp.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.shopapp.models.*;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByPhoneNumber(String phoneNumber);
    Optional<User> findByPhoneNumber(String phoneNumber);
    Page<User> findByFullNameContaining(String keyword, Pageable pageable);
}

