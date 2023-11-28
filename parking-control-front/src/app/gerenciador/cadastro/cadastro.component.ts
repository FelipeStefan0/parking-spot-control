import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ParkingSpot } from '../../models/parking-spot-model';
import { ParkingSpotService } from '../../services/parking-spot.service';
import { lastValueFrom, map, tap } from 'rxjs';

import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import titles from '../../../assets/titles.json'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  entityParkingSpot!: ParkingSpot;
  parkingSpots = new MatTableDataSource<ParkingSpot>();

  formParkingSpot!: FormGroup;

  displayedColumns: String[] = titles.titles;

  edit: boolean = false;
  index!: number;

  constructor(private fb: FormBuilder, private ps: ParkingSpotService) {}

  ngOnInit() {
    this.formInit();
    this.getParkingSpots();
  }

  formInit() {
    this.formParkingSpot = new FormGroup({
      parkingSpotNumber: new FormControl('', Validators.required),
      licensePlateCar: new FormControl('', Validators.required),
      brandCar: new FormControl('', Validators.required),
      modelCar: new FormControl('', Validators.required),
      responsibleName: new FormControl('', Validators.required),
      apartment: new FormControl(''),
      block: new FormControl(''),
    })
    this.edit = false;
    this.changeForm();
    this.getParkingSpots();
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
    .pipe(
      tap((res:any) => this.parkingSpots.data = res.content),
      map(() => {
        this.parkingSpots.data = this.parkingSpots.data.sort((a,b) => a.responsibleName.localeCompare(b.responsibleName));
      })
    )
    .subscribe()
  }

  updateParkingSpot(parkingSpot: ParkingSpot, index: number) {
    this.formParkingSpot?.patchValue(parkingSpot);
    this.edit = true;
    document.getElementsByTagName('tr')[index+1].style.backgroundColor = "rgb(250, 250, 250)";
  }

  deleteParkingSpot(parkingSpot: ParkingSpot) {
    this.ps.deleteParkingSpot(parkingSpot).subscribe((res) => console.log(res));
    this.parkingSpots.data = this.parkingSpots.data.filter((spot) => spot !== parkingSpot)
    this.formInit();
  }

  changeForm() {
    this.formParkingSpot.get("parkingSpotNumber")?.valueChanges.subscribe((value: String) => { 
      let parkingSpotNumber = value.split(/([0-9]+)/);
      this.formParkingSpot.get("apartment")?.setValue(parkingSpotNumber[1]);
      this.formParkingSpot.get("block")?.setValue(parkingSpotNumber[2].toUpperCase()); 
    });
  }
}
