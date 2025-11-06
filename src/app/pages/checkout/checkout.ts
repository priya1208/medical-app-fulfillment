import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService, Patient } from '../../services/patientservice';
import { Orderservice } from '../../services/orderservice';
import { CartService } from '../../services/cartservice';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  patient!: Patient | null;
  medicines: any[] = [];
  totalAmount = 0;

  constructor(
    private patientService: PatientService,
    private orderservice: Orderservice,
    private snack: MatSnackBar,
    private cart : CartService
  ) { }

  ngOnInit(): void {
    
    this.patient = this.cart.getPatient();
   
    this.medicines = this.cart.getMedicines().map(med => ({
      name: med.medicine_name,
      qty: med.qty || 1, // default 1 if not set
      price: med.mrp
    }));
    this.totalAmount = this.medicines.reduce((sum, med) => sum + (med.qty * med.price), 0);
  }

  placeOrder(): void {
    if (!this.patient) {
      this.snack.open('Please add a patient first.', 'Close', { duration: 2000 });
      return;
    }
    if (!this.medicines.length) {
      this.snack.open('Please add medicines to cart first.', 'Close', { duration: 2000 });
      return;
    }
    const order = {
      patient: this.patient,
      medicines: this.medicines,
      total: this.totalAmount,
      date: new Date(),
    };
    this.orderservice.placeOrder(order).subscribe(() => {
      this.snack.open('✅ Order placed successfully!', 'Close', { duration: 2000 });
     
      this.cart.setMedicines([]);
      this.cart.setPatient(null);
    });
  }
}