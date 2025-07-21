import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/userservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})

export class Signup {

  constructor(private userServ: UserService, private router: Router) {}

  // You will need to use this function on your front end. look at the form in login.html, lines 3-7, to get an idea of how it works. 
  signUp(username: string, password: string, email: string) {
    this.userServ.signUp(username, password, email).subscribe(user => {
      if (user) {
        this.router.navigate(['/wine-dashboard']);
      } else {
        alert('Signup Failed Failed\nCauses: \nUsername already exists\nDatabase could be asleep to save money, wait 3 minutes and try again\nIf problem persists after delay, contact developer: Dallas Wade');
      }
    });
  }

  goToLogin()
  {
    this.router.navigate(["login"]);
  }
}
