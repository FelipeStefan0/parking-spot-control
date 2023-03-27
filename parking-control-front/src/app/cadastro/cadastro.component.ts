import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ParkingSpot } from '../models/parking-spot-model';
import { ParkingSpotService } from '../services/parking-spot.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  onceParkingSpot?: ParkingSpot;
  parkingSpots: ParkingSpot[] = [];

  constructor(private fb: FormBuilder, private ps: ParkingSpotService) {}

  ngOnInit() {
    this.getParkingSpots();
  }

  //With FormBuilder
  parkingSpot = this.fb.group({
    parkingSpotNumber: ['', Validators.required],
    licensePlateCar: ['', Validators.required],
    brandCar: ['', Validators.required],
    modelCar: ['', Validators.required],
    colorCar: ['', Validators.required],
    responsibleName: ['', Validators.required],
    apartment: ['', Validators.required],
    block: ['', Validators.required],
  })

  /* Without FormBuilder
  parkingSpot = new FormGroup({
    parkingSpotNumber: new FormControl(''),
    licensePlateCar: new FormControl(''),
    brandCar: new FormControl(''),
    modelCar: new FormControl(''),
    colorCar: new FormControl(''),
    responsibleName: new FormControl(''),
    apartment: new FormControl(''),
    block: new FormControl(''),
  })*/

  onSubmit() {
    this.onceParkingSpot = {
      parkingSpotNumber: this.parkingSpot.value.parkingSpotNumber as string,
      licensePlateCar: this.parkingSpot.value.licensePlateCar as string,
      brandCar: this.parkingSpot.value.brandCar as string,
      modelCar: this.parkingSpot.value.modelCar as string,
      colorCar: this.parkingSpot.value.colorCar as string,
      responsibleName: this.parkingSpot.value.responsibleName as string,
      apartment: this.parkingSpot.value.apartment as string,
      block: this.parkingSpot.value.block as string
    };

    this.ps.createParkingSpot(this.onceParkingSpot).subscribe(parkingSpot => this.parkingSpots.push(parkingSpot));
  }

  getParkingSpots() {
    this.ps.getParkingSpots().subscribe(spot => this.parkingSpots = spot);
    console.log(this.parkingSpots)
  }
}
