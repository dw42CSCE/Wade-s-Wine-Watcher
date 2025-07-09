import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
  constructor(private userServ: UserService, private router: Router) {}

  protected login(username: string, password: string) {
    if (this.userServ.login(username, password))
      {
      this.router.navigate(['/wine-dashboard']);
    }
    else{
      alert('Invalid username or password');
    }
  }

  ngOnInit() {
    if(this.userServ.getUser() !== null) {
      this.router.navigate(['/wine-dashboard']);
    }; 
  }

}
