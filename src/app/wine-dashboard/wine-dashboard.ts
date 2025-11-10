import { Component } from '@angular/core';
import { WineCard } from '../wine-card/wine-card';
import { Wine } from '../models/wine.model';
import { Router, RouterModule } from '@angular/router';
import { User } from '../models/user.model';
import { Input } from '@angular/core';
import { UserService } from '../services/userservice';
import { WineService } from '../services/wineservice';

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
    if (!this.userServ.checkToken()) {
      this.router.navigate(['login']);
    } else {
      this.getWines();
    }
  }

  removeWine(wineId: number) {
    this.wines = this.wines.filter(w => w.id !== wineId);
  }

  getWines(): void {
    this.wineServ.getWines().subscribe(
      (data: Wine[]) => {
        this.wines = data;
      },
      (err) => {
        console.error('Error fetching wines:', err);
      }
    );
  }
  goToWine(id: number) {
    this.router.navigate(['/wine', id]);
  }
}
