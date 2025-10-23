import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor(){
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations? JSON.parse(savedReservations) : [];
  }

  //CRUD
  getReservations(): Reservation[] {
    return this.reservations
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  addReservation(res: Reservation): void {
    res.id = Date.now().toString();
    this.reservations.push(res);
    console.log(this.reservations);
    localStorage.setItem("reservations",JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem("reservations",JSON.stringify(this.reservations));
  }

  updateResvation(id: string, res: Reservation): void {
    let index = this.reservations.findIndex(r => r.id === id);
    this.reservations[index] = res;
    localStorage.setItem("reservations",JSON.stringify(this.reservations));
  }
}
