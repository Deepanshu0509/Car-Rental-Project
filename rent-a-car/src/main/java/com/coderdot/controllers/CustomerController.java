package com.coderdot.controllers;

import com.coderdot.dtos.BookACarDto;
import com.coderdot.dtos.CarDto;
import com.coderdot.services.customer.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/cars")
    public ResponseEntity<List<CarDto>> getAllCars() {
        List<CarDto> carDtoList = customerService.getAllCars();
        return ResponseEntity.ok(carDtoList);
    }

    @GetMapping("/car/{carId}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long carId){
        CarDto carDto = customerService.getCarById(carId);
        if(carDto != null){
            return ResponseEntity.ok(carDto);
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/car/book/{carId}")
    public ResponseEntity<?> BookACar(@PathVariable long carId, @RequestBody BookACarDto bookACarDto){
        boolean success = customerService.bookACar(carId, bookACarDto);
        if(success){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
