import { Injectable } from '@angular/core';
import { ParkingSpot } from '../models/parking-spot-model';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotService {

  private parkingSpotUrl = 'http://localhost:8080/api/parking-spot';

  constructor(private http: HttpClient) { }

  getParkingSpots(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(this.parkingSpotUrl);
  }

  createParkingSpot(parkingSpot: ParkingSpot): Observable<ParkingSpot>{
    return this.http.post<ParkingSpot>(this.parkingSpotUrl, parkingSpot);
  }
}
