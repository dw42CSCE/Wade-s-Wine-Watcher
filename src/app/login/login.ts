import { Component } from '@angular/core';
import { UserService } from '../services/userservice';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class Login {

  logInForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private userServ: UserService, private router: Router, private fb:FormBuilder) {}

  login(username: string, password: string) {
    this.errorMessage = '';
    this.isLoading = true;
    this.userServ.login(username, password).subscribe({
      next: user => {
        this.isLoading = false;
        if (user) {
          this.router.navigate(['/wine-dashboard']);
        }
      },
      error: err => {
        this.isLoading = false;
        this.errorMessage = err.status === 401
          ? 'Login failed: Username or password incorrect.'
          : 'Login failed: Database may be asleep. Wait a few minutes and try again. If it persists, contact the developer.';
      }
    });
  }

  ngOnInit() {
    if (this.userServ.checkToken() == true) {
      this.router.navigate(['/wine-dashboard']);
    }
    this.logInForm = this.fb.group({
      username:['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
    });
  }
  
  goToSignup(){
    this.router.navigate(["signup"]);
  }

}

