import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private patient: any = null;
  private medicines: any[] = [];

  setPatient(patient: any) {
    this.patient = patient;
  }
  getPatient(): any {
    return this.patient;
  }

  setMedicines(meds: any[]) {
    this.medicines = meds;
  }
  getMedicines(): any[] {
    return this.medicines;
  }

  clear() {
    this.patient = null;
    this.medicines = [];
  }
}