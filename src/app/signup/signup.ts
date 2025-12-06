import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/userservice';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})

export class Signup {

  signUpForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private userServ: UserService, private router: Router, private fb:FormBuilder) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username:['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  

  // You will need to use this function on your front end. look at the form in login.html, lines 3-7, to get an idea of how it works. 
  signUp(username: string, password: string, email: string) {
    this.errorMessage = '';
    this.isLoading = true;
    this.userServ.signUp(username, password, email).subscribe({
      next: user => {
        this.isLoading = false;
        if (user) {
          this.router.navigate(['/wine-dashboard']);
        }
      },
      error: err => {
        this.isLoading = false;
        this.errorMessage = err.status === 409
          ? 'Signup failed: Username already exists.'
          : 'Signup failed: Database may be asleep. Wait a few minutes and try again. If it persists, contact the developer.';
      }
    });
  }

  goToLogin()
  {
    this.router.navigate(["login"]);
  }
}
