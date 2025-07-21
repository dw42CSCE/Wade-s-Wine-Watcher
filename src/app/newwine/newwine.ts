import { Component } from '@angular/core';

@Component({
  selector: 'app-newwine',
  imports: [],
  templateUrl: './newwine.html',
  styleUrl: './newwine.css'
})
export class NewWine {

  newWine(wineName: string, wineDescription: string, wineStartDate: string, wineStartSpecGrav: string, wineEndSpecGrav: string, wineIngredients: string, wineRackDates: string) {
    console.log('New wine added:', wineName);
  }
}
