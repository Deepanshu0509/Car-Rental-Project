package com.coderdot.services;

import com.coderdot.dtos.SignupRequest;
import com.coderdot.dtos.UserDto;
import com.coderdot.entities.User;
import com.coderdot.enums.UserRole;
import com.coderdot.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
//@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void createAdminAccount(){
        User adminAccount = userRepository.findByUserRole(UserRole.ADMIN);
        if(adminAccount == null){
            adminAccount = new User();
            adminAccount.setName("Admin");
            adminAccount.setUserRole(UserRole.ADMIN);
            adminAccount.setEmail("admin@test.com");
            adminAccount.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(adminAccount);
        }
    }

    @Override
    public UserDto createCustomer(SignupRequest signupRequest) {
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.CUSTOMER);
        User createdCustomer = userRepository.save(user);
        UserDto createdUserDto = new UserDto();
        createdUserDto.setId(createdCustomer.getId());
        createdUserDto.setName(createdCustomer.getName());
        createdUserDto.setEmail(createdCustomer.getEmail());
        createdUserDto.setUserRole(createdCustomer.getUserRole());
        return createdUserDto;
    }

    @Override
    public boolean hasCustomerWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
}
