package com.coderdot.services.customer;

import com.coderdot.dtos.BookACarDto;
import com.coderdot.dtos.CarDto;
import com.coderdot.entities.BookACar;
import com.coderdot.entities.Car;
import com.coderdot.entities.User;
import com.coderdot.enums.BookCarStatus;
import com.coderdot.repositories.BookACarRepository;
import com.coderdot.repositories.CarRepository;
import com.coderdot.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService{
    @Autowired
    private CarRepository carRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookACarRepository bookACarRepository;


    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public CarDto getCarById(Long carId) {
        Optional<Car> optionalCar = carRepository.findById(carId);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public boolean bookACar(Long carId, BookACarDto bookACarDto) {
        Optional<User>  optionalUser = userRepository.findById(bookACarDto.getUserId());
        Optional<Car> optionalCar = carRepository.findById(carId);
        if(optionalCar.isPresent() && optionalUser.isPresent()){
            BookACar bookACar = new BookACar();
            long diffInMilliSeconds = bookACarDto.getToDate().getTime() - bookACarDto.getFromDate().getTime();
            long days = TimeUnit.MILLISECONDS.toDays(diffInMilliSeconds);
            bookACar.setDays(days);
            bookACar.setUser(optionalUser.get());
            bookACar.setCar(optionalCar.get());
            bookACar.setAmount(optionalCar.get().getPrice() * days);
            bookACar.setFromDate(bookACarDto.getFromDate());
            bookACar.setToDate(bookACarDto.getToDate());
            bookACar.setBookCarStatus(BookCarStatus.PENDING);
            bookACarRepository.save(bookACar);
            return true;
        }
        return false;
    }

    @Override
    public List<BookACarDto> getBookingsByUserId(Long userId) {
        return bookACarRepository.findAllByUserId(userId).stream().map(BookACar::getBookACarDto).collect(Collectors.toList());
    }
}
