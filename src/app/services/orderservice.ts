import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Medicine {
  id: string;
  name: string;
  price: number;
  qty: number;
}

@Injectable({
  providedIn: 'root',
})
export class Orderservice {
  private medicines: Medicine[] = [];
  private orders: any[] = [];

  constructor() { }


  addMedicine(medicine: Medicine): void {
    const existing = this.medicines.find((m) => m.id === medicine.id);
    if (existing) {
      existing.qty += medicine.qty;
    } else {
      this.medicines.push(medicine);
    }
    console.log('Added medicine:', this.medicines);
  }


  removeMedicine(id: string): void {
    this.medicines = this.medicines.filter((m) => m.id !== id);
  }


  getMedicines(): Medicine[] {
    return this.medicines;
  }


  clearMedicines(): void {
    this.medicines = [];
  }


  placeOrder(order: any): Observable<any> {
    const newOrder = {
      ...order,
      medicines: this.medicines,
      total: this.medicines.reduce(
        (sum, m) => sum + m.price * m.qty,
        0
      ),
      date: new Date(),
    };

    this.orders.push(newOrder);
    console.log('Order placed:', newOrder);


    this.clearMedicines();

    return of(newOrder);
  }


  getOrders(): any[] {
    return this.orders;
  }
}
