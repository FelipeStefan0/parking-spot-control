package com.api.parkingcontrol.controllers;

import com.api.parkingcontrol.dtos.ParkingSpotDtos;
import com.api.parkingcontrol.models.ParkingSpotModel;
import com.api.parkingcontrol.services.ParkingSpotService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/parking-spot")
public class ParkingSpotController {

    final ParkingSpotService parkingSpotService;

    public ParkingSpotController(ParkingSpotService parkingSpotService) {
        this.parkingSpotService = parkingSpotService;
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Object> saveParkingSpot(@RequestBody @Valid ParkingSpotDtos parkingSpotDto) {
        if(parkingSpotService.existsByLicensePlateCar(parkingSpotDto.getLicensePlateCar())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: License Plate Car is already in use!");
        }
        if(parkingSpotService.existByParkingSpotNumber(parkingSpotDto.getParkingSpotNumber())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Parking Spot is already in use!");
        }
        if(parkingSpotService.existByApartmentAndBlock(parkingSpotDto.getApartment(), parkingSpotDto.getBlock())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Parking Spot already registered for this apartment/block!");
        }
        var parkingSpotModel = new ParkingSpotModel();
        BeanUtils.copyProperties(parkingSpotDto, parkingSpotModel);
        parkingSpotModel.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.CREATED).body(parkingSpotService.save(parkingSpotModel));
    }

//    @GetMapping
//    public List<ParkingSpotModel> getAllParkingSpots() {
//        return parkingSpotService.findAll();
//    }

    @GetMapping
    public Page<ParkingSpotModel> getAllParkingSpots(@PageableDefault(size = 10, page = 0, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return parkingSpotService.findAll(pageable);
    }

    @GetMapping("/{plateCar}")
    public ResponseEntity<Object> getOneParkingSpot(@PathVariable(value="plateCar") String plateCar){
        Optional<ParkingSpotModel> parkingSpotModelOptional = parkingSpotService.findByLicensePlateCar(plateCar);
        if(!parkingSpotModelOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Parking Spot not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(parkingSpotModelOptional.get());
    }

    @DeleteMapping("/{plateCar}")
    public ResponseEntity<Object> deleteParkingSpot(@PathVariable(value = "plateCar") String plateCar){
        Optional<ParkingSpotModel> parkingSpotModelOptional = parkingSpotService.findByLicensePlateCar(plateCar);
        HashMap<String,String> response = new HashMap<>();
        if(!parkingSpotModelOptional.isPresent()) {
            response.put("message", "Parking Spot not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        parkingSpotService.delete(parkingSpotModelOptional.get());
        response.put("message", "Parking Spot deleted successfully.");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/{plateCar}")
    public ResponseEntity<Object> updateParkingSpot(@PathVariable(value = "plateCar") String plateCar,
                                                    @RequestBody @Valid ParkingSpotDtos parkingSpotDto){
        Optional<ParkingSpotModel> parkingSpotModelOptional = parkingSpotService.findByLicensePlateCar(plateCar);
        if(!parkingSpotModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Parking Spot not found");
        }

        var parkingSpotModel = new ParkingSpotModel();
        BeanUtils.copyProperties(parkingSpotDto, parkingSpotModel);
        parkingSpotModel.setId(parkingSpotModelOptional.get().getId());
        parkingSpotModel.setRegistrationDate(parkingSpotModelOptional.get().getRegistrationDate());
        return ResponseEntity.status(HttpStatus.OK).body(parkingSpotService.save(parkingSpotModel));
    }

}
