import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation-service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css'
})
export class ReservationForm implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }


  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate : ['', Validators.required],
      checkOutDate : ['', Validators.required],
      guestName : ['', Validators.required],
      guestEmail : ['', [Validators.required, Validators.email]],
      roomNumber : ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.reservationService.getReservation(id).subscribe(
        reservation => {
                        if(reservation) this.reservationForm.patchValue(reservation);
                        })
    }
  }



  onSubmit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    let reservation: Reservation = this.reservationForm.value;
    if (id) {
      reservation.id=id;
      this.reservationService.updateResvation(id, reservation).subscribe(() =>{console.log("update has been submitted")});
      
    } else {
      this.reservationService.addReservation(reservation).subscribe(() =>{console.log("new Reservation has been submitted")});
    }

    this.router.navigate(['/list']);
  }
}
