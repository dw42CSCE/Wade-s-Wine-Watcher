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
    this.userServ.signUp(username, password, email).subscribe({
      next: user => {
        if (user) {
          this.router.navigate(['/wine-dashboard']);
        }
      },
      error: err => {
        if (err.status === 409) {
          alert('Signup Failed\nUsername already exists');
        } else {
          alert(
            'Signup Failed\nDatabase is stateless and sleeps, wait 3 minutes and try again.\nDatabase will autostart after the first request is sent\nIf the problem persists after delay, contact developer: Dallas Wade.'
          );
        }
      }
    });
  }

  goToLogin()
  {
    this.router.navigate(["login"]);
  }
}
