import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../services/patientservice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cartservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpatient',
  standalone: false,
  templateUrl: './addpatient.html',
  styleUrls: ['./addpatient.css'],
})
export class Addpatient implements OnInit {
  patientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private snack: MatSnackBar,
    private cart: CartService,        
    private router: Router             
  ) { }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: [''],
      mobile: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      zipcode: [''],
      dob: [''],
      gender: [''],
      blood_group: [''],
    });
  }

  onSubmit(): void {
    if (this.patientForm.invalid) return;

    this.patientService.savePatient(this.patientForm.value).subscribe({
      next: () => {
        this.cart.setPatient(this.patientForm.value); 
        this.snack.open('Patient saved successfully ✅', 'Close', { duration: 2000 });
        this.patientForm.reset();
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        this.snack.open('Failed to save patient ❌', 'Close', { duration: 2000 });
      },
    });
  }
}