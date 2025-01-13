package com.coderdot.services.admin;

import com.coderdot.dtos.CarDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    boolean postCar(CarDto carDto);

    List<CarDto> getAllCars();

    void deleteCar(Long carId);

    CarDto getCarById(Long carId);

    boolean updateCar(Long carId, CarDto carDto) throws IOException;
}
