import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup;
  hide = true;
  loading = false;
  errorMessage = '';
  username = '';
  password = '';
  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    
  ) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
   onLogin() {
    if (this.auth.login(this.username, this.password)) {
      alert('Login successful!');
      console.log("login successful");
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const { mobile, password } = this.loginForm.value;

    this.auth.login(mobile, password).subscribe({
      next: (response) => {
        console.log('Login success:', response);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        this.loading = false;
        this.errorMessage = 'Invalid mobile number or password.';
      }
    });
  }
}
