import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ParkingSpot } from '../../models/parking-spot-model';
import { ParkingSpotService } from '../../services/parking-spot.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  entityParkingSpot!: ParkingSpot;
  parkingSpots: ParkingSpot[] = [];

  formParkingSpot!: FormGroup;

  titles: String[] = [];

  edit: boolean = false;
  indexEdit!: number;

  constructor(private fb: FormBuilder, private ps: ParkingSpotService) {}

  ngOnInit() {
    this.formInit();
    this.getParkingSpots();
    this.titles = this.ps.getTitltes();
  }

  formInit() {
    this.formParkingSpot = this.fb.group({
      parkingSpotNumber: ['', Validators.required],
      licensePlateCar: ['', Validators.required],
      brandCar: ['', Validators.required],
      modelCar: ['', Validators.required],
      colorCar: ['', Validators.required],
      responsibleName: ['', Validators.required],
      apartment: ['', Validators.required],
      block: ['', Validators.required],
    })
    this.edit = false;
  }

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

    if(this.edit) {
      this.ps.updateParkingSpot(this.entityParkingSpot).subscribe((parkingSpot) => this.parkingSpots[this.indexEdit] = parkingSpot);
    } else {
      this.ps.createParkingSpot(this.entityParkingSpot).subscribe(parkingSpot => this.parkingSpots.push(parkingSpot));
    }

    this.formInit();
    this.edit = false;
  }

  getParkingSpots() {
    this.ps.getParkingSpots().subscribe(spot => this.parkingSpots = spot);
  }

  updateParkingSpot(parkingSpot: ParkingSpot, index: number) {
    this.formParkingSpot?.patchValue(parkingSpot);
    this.indexEdit = index;
    this.edit = true;
  }

  deleteParkingSpot(parkingSpot: ParkingSpot) {
    this.ps.deleteParkingSpot(parkingSpot).subscribe();
    this.parkingSpots = this.parkingSpots.filter((spot) => spot !== parkingSpot)
  }

}
