package com.coderdot.services.admin;

import com.coderdot.dtos.CarDto;

import java.util.List;

public interface AdminService {
    boolean postCar(CarDto carDto);

    List<CarDto> getAllCars();

    void deleteCar(Long carId);

    CarDto getCarById(Long carId);
}
