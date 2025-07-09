import { Component, Input } from '@angular/core';
import { Wine } from '../models/wine.model';
import { CommonModule, DatePipe } from '@angular/common';
@Component({
  selector: 'app-wine-card',
  imports: [DatePipe, CommonModule],
  templateUrl: './wine-card.html',
  styleUrl: './wine-card.css'
})
export class WineCard {
  @Input() wine!: Wine;

  progress: number = 0;
  abv: number = 0;

  rackCount: number = 0;

  wineImg1 = '/wine.png';
  wineImg2 = '/wine.png';
  wineImg3 = '/wine.png';
  wineImg4 = '/wine.png';

  arrow1filt = {filter: 'invert(.8)'};
  arrow2filt = {filter: 'invert(.8)'};
  arrow3filt = {filter: 'invert(.8)'};

  ngOnInit() {
    this.progress = this.getProgress(this.wine.startDate);
    this.abv = this.calculateABV(this.wine.startSpecificGravity, this.wine.endSpecificGravity);
    const rackCount = this.wine.rackDates.length;
    this.setWineImages(); //sets wine images based on progress
  }

  public setWineImages() {
    this.wineImg1 = 'wine.png';
    this.wineImg2 = 'wine.png';
    this.wineImg3 = 'wine.png';
    this.wineImg4 = 'wine.png';

    if (this.wine.rackDates.length > 0) {
      const rackCount = this.wine.rackDates.length;
      const percent = this.getProgress(this.wine.startDate);

      if (rackCount == 0) {
        this.wineImg1 = this.getWineImage(percent);
      }
      if (rackCount == 1) {
        this.wineImg2 = this.getWineImage(percent);
        this.arrow1filt = { filter: '' }; 
      }
      if (rackCount == 2) {
        this.wineImg3 = this.getWineImage(percent);
        this.arrow1filt = { filter: '' }; 
        this.arrow2filt = { filter: '' };
      }
      if (rackCount == 3) {
        this.wineImg4 = this.getWineImage(percent);
        this.arrow1filt = { filter: '' }; 
        this.arrow2filt = { filter: '' };
        this.arrow3filt = { filter: '' };
      }
    }
  }

  public getWineImage(percent: number): string {
    // if (percent >= 100) {
    //   return 'wine1000.png';
    // } else if (percent >= 87.5) {
    //   return 'wine875.png';
    // } else if (percent >= 75) {
    //   return 'wine750.png';
    // } else if (percent >= 62.5) {
    //   return 'wine625.png';
    // } else if (percent >= 50) {
    //   return 'wine500.png';
    // } else if (percent >= 37.5) {
    //   return 'wine375.png';
    // } else if (percent >= 25) {
    //   return 'wine250.png';
    // } else if (percent >= 12.5) {
    //   return 'wine125.png';
    // } else {
    //   return 'wine0.png';
    // }

    return 'wine.png'; // remove after images are added
  }

  public calculateABV(startSpecificGravity: number, endSpecificGravity: number): number {
    var alc: number = (startSpecificGravity - endSpecificGravity) * 131.25;

    alc = Math.round(alc * 100) / 100; // Round to 2 decimal places

    return alc;
  }

  public getProgress(startDate: Date): number {
    const today = new Date();

    // Calculate difference in days
    const diffInMs = today.getTime() - startDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    // Clamp progress between 0 and 100
    let progress = (diffInDays / 120) * 100;
    progress = Math.min(Math.max(progress, 0), 100); // restrict to [0, 100]

    console.log(`Progress for ${this.wine.name}: ${progress}%`);

    progress = Math.round(progress); // Round to nearest integer

    if (this.rackCount == 0) {
      progress = Math.max(progress, 25);
    } else if (this.rackCount == 1) {
      progress = Math.max(progress, 50);
    } else if (this.rackCount == 2) {
      progress = Math.max(progress, 75);
    } else if (this.rackCount == 3) {
      progress = Math.max(progress, 100);
    }

    return progress;
  }
}
