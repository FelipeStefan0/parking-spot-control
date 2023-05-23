import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ParkingSpot } from '../../models/parking-spot-model';
import { ParkingSpotService } from '../../services/parking-spot.service';
import { finalize, lastValueFrom, tap } from 'rxjs';

import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import titles from '../../../assets/titles.json'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  entityParkingSpot!: ParkingSpot;
  parkingSpots!: ParkingSpot[];

  formParkingSpot!: FormGroup;

  displayedColumns: String[] = titles.titles;

  edit: boolean = false;

  constructor(private fb: FormBuilder, private ps: ParkingSpotService) {}

  ngOnInit() {
    this.formInit();
    this.getParkingSpots();
  }

  formInit() {
    this.formParkingSpot = this.fb.group({
      parkingSpotNumber: ['', Validators.required],
      licensePlateCar: ['', Validators.required],
      brandCar: ['', Validators.required],
      modelCar: ['', Validators.required],
      responsibleName: ['', Validators.required],
      apartment: ['', Validators.required],
      block: ['', Validators.required],
    })
    this.edit = false;
    this.changeForm();
  }

  async onSubmit() {
    this.entityParkingSpot = this.formParkingSpot.value;
    if(this.edit) {
      await lastValueFrom(this.ps.updateParkingSpot(this.entityParkingSpot));
      this.getParkingSpots();
    } else {
      await lastValueFrom(this.ps.createParkingSpot(this.entityParkingSpot));
      this.getParkingSpots();
    }
    this.formInit();
    this.edit = false;
  }

  getParkingSpots() {
    this.ps.getParkingSpots()
    .subscribe(parkingSpot => { 
      this.parkingSpots = parkingSpot;
      this.parkingSpots = this.parkingSpots.sort((a,b) => a.responsibleName.localeCompare(b.responsibleName));
    });
  }

  updateParkingSpot(parkingSpot: ParkingSpot) {
    this.formParkingSpot?.patchValue(parkingSpot);
    this.edit = true;
  }

  deleteParkingSpot(parkingSpot: ParkingSpot) {
    this.ps.deleteParkingSpot(parkingSpot).subscribe();
    this.parkingSpots = this.parkingSpots.filter((spot) => spot !== parkingSpot)
    this.formInit();
  }

  changeForm() {
    this.formParkingSpot.get("parkingSpotNumber")?.valueChanges.subscribe((value: String) => { 
      let parkingSpotNumber = value.split(/([0-9]+)/);
      this.formParkingSpot.get("apartment")?.setValue(parkingSpotNumber[1]);
      this.formParkingSpot.get("block")?.setValue(parkingSpotNumber[2]); 
    });
  }
}
