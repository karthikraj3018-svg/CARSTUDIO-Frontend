package com.example.demo;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }

    public Car createCar(Car car) {
        return carRepository.save(car);
    }

    public Car updateCar(Long id, Car updatedCar) {
        return carRepository.findById(id)
                .map(car -> {
                    car.setBrand(updatedCar.getBrand());
                    car.setModel(updatedCar.getModel());
                    car.setPrice(updatedCar.getPrice());
                    car.setImage(updatedCar.getImage());
                    car.setActive(updatedCar.isActive());

                    return carRepository.save(car);
                })
                .orElse(null);
    }

    public boolean deleteCar(Long id) {
        if (!carRepository.existsById(id)) {
            return false;
        }

        carRepository.deleteById(id);
        return true;
    }
}