import { Component } from '@angular/core';
import { WineCard } from '../wine-card/wine-card';
import { Wine } from '../models/wine.model';
import { Router, RouterModule } from '@angular/router';
import { User } from '../models/user.model';
import { Input } from '@angular/core';
import { UserService } from '../services/user';
import { WineService } from '../services/wine';

@Component({
  selector: 'app-wine-dashboard',
  imports: [WineCard, RouterModule],
  templateUrl: './wine-dashboard.html',
  styleUrl: './wine-dashboard.css'
})
export class WineDashboard {
  @Input() user?: User | null;

  constructor(private router: Router, private wineServ: WineService, private userServ: UserService) {}

  wines: Wine[] = [];

  ngOnInit() {
    this.user = this.userServ.getUser();
    if (!this.user) {
      this.router.navigate(['login']);
    } else {
      this.wines = this.getWines(this.user.id);
    }
  }

  getWines(userId: number): Wine[] {
    return this.wineServ.getWines(userId)
  }

  goToWine(id: number) {
    this.router.navigate(['/wine', id]);
  }
}
