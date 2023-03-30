import { Injectable } from '@angular/core';
import { ParkingSpot } from '../models/parking-spot-model';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import titles from '../../assets/titles.json'

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotService {

  private parkingSpotUrl = 'http://localhost:8080/api/parking-spot';
  private titles: string[] = titles.titles;

  constructor(private http: HttpClient) { }

  getTitltes(): string[] {
    return this.titles;
  }

  getParkingSpots(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(this.parkingSpotUrl);
  }

  createParkingSpot(parkingSpot: ParkingSpot): Observable<ParkingSpot>{
    return this.http.post<ParkingSpot>(this.parkingSpotUrl, parkingSpot);
  }
}
