package com.coderdot.services.admin;

import com.coderdot.dtos.BookACarDto;
import com.coderdot.dtos.CarDto;
import com.coderdot.dtos.CarDtoList;
import com.coderdot.dtos.SearchCarDto;
import com.coderdot.entities.BookACar;
import com.coderdot.entities.Car;
import com.coderdot.enums.BookCarStatus;
import com.coderdot.repositories.BookACarRepository;
import com.coderdot.repositories.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
//@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    @Autowired
    private CarRepository carRepository;

    @Autowired
    private BookACarRepository bookACarRepository;

    @Override
    public boolean postCar(CarDto carDto) {
        try {
            Car car = new Car();
            car.setName(carDto.getName());
            car.setBrand(carDto.getBrand());
            car.setColor(carDto.getColor());
            car.setPrice(carDto.getPrice());
            car.setType(carDto.getType());
            car.setDescription(carDto.getDescription());
            car.setModelYear(carDto.getModelYear());
            car.setTransmission(carDto.getTransmission());
            car.setImage(carDto.getImage().getBytes());
            carRepository.save(car);
            return true;
        }catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public void deleteCar(Long carId) {
        carRepository.deleteById(carId);
    }

    @Override
    public CarDto getCarById(Long carId) {
        Optional<Car> optionalCar = carRepository.findById(carId);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public boolean updateCar(Long carId, CarDto carDto) throws IOException {
        Optional<Car> optionalCar = carRepository.findById(carId);
        if(optionalCar.isPresent()){
            Car existingCar = optionalCar.get();
            existingCar.setName(carDto.getName());
            existingCar.setBrand(carDto.getBrand());
            existingCar.setColor(carDto.getColor());
            existingCar.setPrice(carDto.getPrice());
            existingCar.setType(carDto.getType());
            existingCar.setDescription(carDto.getDescription());
            existingCar.setModelYear(carDto.getModelYear());
            existingCar.setTransmission(carDto.getTransmission());
            if(carDto.getImage() != null){
                existingCar.setImage(carDto.getImage().getBytes());
            }
            carRepository.save(existingCar);
            return true;
        }
        return false;
    }

    @Override
    public List<BookACarDto> getBookings() {
        return bookACarRepository.findAll().stream().map(BookACar::getBookACarDto).collect(Collectors.toList());
    }

    @Override
    public boolean changeBookingStatus(Long bookingId, String status) {
        Optional<BookACar> optionalBookACar = bookACarRepository.findById(bookingId);
        if(optionalBookACar.isPresent()){
            BookACar existingBookACar = optionalBookACar.get();
            if(Objects.equals(status, "Approve")){
                existingBookACar.setBookCarStatus(BookCarStatus.APPROVED);
            }
            else{
                existingBookACar.setBookCarStatus(BookCarStatus.REJECTED);
            }
            bookACarRepository.save(existingBookACar);
            return true;
        }
        return false;
    }

    @Override
    public CarDtoList searchCar(SearchCarDto searchCarDto) {
        Car car = new Car();
        car.setId(null);
        car.setBrand(searchCarDto.getBrand());
        car.setType(searchCarDto.getType());
        car.setTransmission(searchCarDto.getTransmission());
        car.setColor(searchCarDto.getColor());
        ExampleMatcher exampleMatcher = ExampleMatcher.matchingAll()
                .withIgnoreNullValues()
                .withIgnorePaths("id")
                .withMatcher("brand", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase(true))
                .withMatcher("type", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase(true))
                .withMatcher("transmission", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase(true))
                .withMatcher("color", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase(true));
        Example<Car> carExample = Example.of(car, exampleMatcher);
        List<Car> cars = carRepository.findAll(carExample);
        CarDtoList carDtoList = new CarDtoList();
        carDtoList.setCarDtoList(cars.stream().map(Car::getCarDto).collect(Collectors.toList()));
        return carDtoList;
    }
}
