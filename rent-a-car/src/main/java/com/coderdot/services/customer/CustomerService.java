package com.coderdot.services.customer;

import com.coderdot.dtos.CarDto;

import java.util.List;

public interface CustomerService {
    List<CarDto> getAllCars();

    CarDto getCarById(Long carId);
}
