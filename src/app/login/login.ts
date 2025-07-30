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

  constructor(private userServ: UserService, private router: Router, private fb:FormBuilder) {}

  login(username: string, password: string) {
    this.userServ.login(username, password).subscribe(user => {
      if (user) {
        this.router.navigate(['/wine-dashboard']);
      } else {
        alert('Login Failed\nCauses: \nUsername or Password Incorrect\nDatabase could be asleep to save money, wait 3 minutes and try again\nIf problem persists after delay, contact developer: Dallas Wade');
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

