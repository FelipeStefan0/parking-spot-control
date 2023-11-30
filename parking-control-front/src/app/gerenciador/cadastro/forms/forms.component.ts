import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ParkingSpot } from 'src/app/models/parking-spot-model';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  @Input() edit:boolean = false;
  @Output() formsValue: any = new EventEmitter<any>();

  entityParkingSpot!: ParkingSpot;
  formParkingSpot!: FormGroup;

  constructor() {}

  ngOnInit() {
    this.formInit();
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
    this.changeForm();
  }

  onSubmit() {
    this.entityParkingSpot = this.formParkingSpot.value;
    this.formsValue.emit(this.entityParkingSpot);
  }

  changeForm() {
    this.formParkingSpot.get("parkingSpotNumber")?.valueChanges.subscribe((value: String) => { 
      let parkingSpotNumber = value.split(/([0-9]+)/);
      this.formParkingSpot.get("apartment")?.setValue(parkingSpotNumber[1]);
      this.formParkingSpot.get("block")?.setValue(parkingSpotNumber[2].toUpperCase()); 
    });
  }
}
