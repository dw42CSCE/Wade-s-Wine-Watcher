import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from './models/user.model';
import { UserService } from './services/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'wades-wine-watcher';

  constructor(private router: Router, private userServ:UserService) {}

  ngOnInit() {
    if (!this.userServ.getUser()){
      console.log('No user found, redirecting to login');
      this.router.navigate(['login']);
    }
  }
}
