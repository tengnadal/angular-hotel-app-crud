import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation-service';

@Component({
  selector: 'app-reservation-list',
  standalone: false,
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.css'
})
export class ReservationList implements OnInit{
   reservations: Reservation[] = [];

   constructor(private reservationService : ReservationService){}
 

 ngOnInit(): void {
   this.reservations = this.reservationService.getReservations();
 }

deleteReservation(id : string): void{
this.reservationService.deleteReservation(id);
}


}
