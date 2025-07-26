import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { WineService } from '../services/wineservice';
import { Router } from '@angular/router';
import { Wine } from '../models/wine.model';

@Component({
  selector: 'app-newwine',
  imports: [FormsModule],
  templateUrl: './newwine.html',
  styleUrl: './newwine.css'
})
export class NewWine {

  constructor(private wineServ: WineService, private router: Router) {}

  newWine(wineName: string, wineDescription: string, wineStartDate: string, wineStartSpecGrav: string, wineEndSpecGrav: string, wineIngredients: string) {
    console.log('New wine added:', wineName);

    const wine: Wine = {
      name: wineName,
      description: wineDescription,
      startDate: new Date(wineStartDate),
      startSpecificGravity: parseFloat(wineStartSpecGrav),
      endSpecificGravity: parseFloat(wineEndSpecGrav),
      ingredients: wineIngredients, // just the string from input, e.g. "Pinot Grigio grapes, Yeast"
      rackDates: []  // send empty array or an array of Date objects like [new Date("2025-08-01T00:00:00"), new Date("2025-08-15T00:00:00")]
    };

      this.wineServ.newWine(wine).subscribe({
        next: (res) => {
          console.log("Wine successfully created:", res);
          this.router.navigate(['/wine-dashboard']);
        },
        error: (err) => {
          console.error("Failed to create wine:", err);
          if (err.error?.errors) {
            console.error("Validation errors:", err.error.errors);
            alert("Validation errors: " + JSON.stringify(err.error.errors));
          } else {
            alert("Error creating wine. Please try again.");
          }
        }
      });

  }


}
