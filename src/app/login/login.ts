import { Component } from '@angular/core';
import { UserService } from '../services/userservice';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule]
})
export class Login {

  constructor(private userServ: UserService, private router: Router) {}

  login(username: string, password: string) {
    this.userServ.login(username, password).subscribe(user => {
      if (user) {
        console.log(username, password)
        this.router.navigate(['/wine-dashboard']);
      } else {
        alert('Invalid username or password');
      }
    });
  }

  ngOnInit() {
    if (this.userServ.checkToken() == true) {
      this.router.navigate(['/wine-dashboard']);
    }
  }

}

