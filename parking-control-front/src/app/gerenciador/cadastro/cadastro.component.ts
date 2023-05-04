import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ParkingSpot } from '../../models/parking-spot-model';
import { ParkingSpotService } from '../../services/parking-spot.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  entityParkingSpot?: ParkingSpot;
  parkingSpots: ParkingSpot[] = [];

  titles: String[] = [];

  constructor(private fb: FormBuilder, private ps: ParkingSpotService) {}

  ngOnInit() {
    this.getParkingSpots();
    this.titles = this.ps.getTitltes();
  }

  clean() {
    this.formParkingSpot.reset();
  }

  //With FormBuilder
  formParkingSpot = this.fb.group({
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
    this.entityParkingSpot = {
      parkingSpotNumber: this.formParkingSpot.value.parkingSpotNumber as string,
      licensePlateCar: this.formParkingSpot.value.licensePlateCar as string,
      brandCar: this.formParkingSpot.value.brandCar as string,
      modelCar: this.formParkingSpot.value.modelCar as string,
      colorCar: this.formParkingSpot.value.colorCar as string,
      responsibleName: this.formParkingSpot.value.responsibleName as string,
      apartment: this.formParkingSpot.value.apartment as string,
      block: this.formParkingSpot.value.block as string
    };

    this.ps.createParkingSpot(this.entityParkingSpot).subscribe(parkingSpot => this.parkingSpots.push(parkingSpot));
  }

  getParkingSpots() {
    this.ps.getParkingSpots().subscribe(spot => this.parkingSpots = spot);
  }

  deleteParkingSpot(parkingSpot: ParkingSpot) {
    this.ps.deleteParkingSpot(parkingSpot).subscribe();
    this.parkingSpots = this.parkingSpots.filter((spot) => spot !== parkingSpot)
  }

}
