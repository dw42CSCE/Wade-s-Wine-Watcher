import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Wine } from '../models/wine.model';
import { CommonModule, DatePipe } from '@angular/common';
import { WineService } from '../services/wineservice';

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
  showDeleteConfirm = false;
  isDeleting = false;

  rackCount: number = 0;

  wineImg1 = '/wine.png';
  wineImg2 = '/wine.png';
  wineImg3 = '/wine.png';
  wineImg4 = '/wine.png';

  arrow1filt = {filter: 'invert(.8)'};
  arrow2filt = {filter: 'invert(.8)'};
  arrow3filt = {filter: 'invert(.8)'};
  arrow1status = '';
  arrow2status = '';
  arrow3status = '';


  ngOnInit() {
    this.rackCount = this.wine.rackDates.length;
    this.progress = this.getProgress(this.wine.startDate);
    this.abv = this.calculateABV(this.wine.startSpecificGravity, this.wine.endSpecificGravity);
    this.setArrows(); //sets arrow status based on rack count and progress
    this.setWineImages(); //sets wine images based on progress
  }

  public getArrowStyle(status: string) {
    if (status === 'Active') {
      return {
        filter: 'drop-shadow(0 0 8px limegreen) brightness(1.4)',
        animation: 'pulse-active 1.5s infinite ease-in-out',
        opacity: 1
      };
    }
    // default style for inactive arrows
    return { filter: 'invert(.8)', opacity: 0.7 };
  }

  arrowActiveStyle = {
    filter: 'invert(45%) sepia(100%) saturate(800%) hue-rotate(270deg) brightness(1.3)',
    opacity: 1,
  };

  public setArrows() {
    console.log(`Rack Count: ${this.rackCount}, Progress: ${this.progress}`);
    if (this.progress == 25) {
      this.arrow1status = 'Active';
      console.log('Arrow 1 Active');
    } else if (this.progress == 50) {
      this.arrow2status = 'Active';
      console.log('Arrow 2 Active');
    } else if (this.progress == 75) {
      this.arrow3status = 'Active';
      console.log('Arrow 3 Active');
    }
    console.log(`Arrow Statuses: ${this.arrow1status}, ${this.arrow2status}, ${this.arrow3status}`);
  }

  public setWineImages() {
    this.wineImg1 = 'wine.png';
    this.wineImg2 = 'wine.png';
    this.wineImg3 = 'wine.png';
    this.wineImg4 = 'wine.png';


    const percent = this.getProgress(this.wine.startDate);

    if (this.rackCount == 0) {
      this.wineImg1 = this.getWineImage(percent*4);
      this.wineImg2 = 'wine0.png';
      this.wineImg3 = 'wine0.png';
      this.wineImg4 = 'wine0.png';
    }
    if (this.rackCount == 1) {
      this.wineImg1 = 'wine1000.png';
      this.wineImg2 = this.getWineImage(percent*2);
      this.wineImg3 = 'wine0.png';
      this.wineImg4 = 'wine0.png';
      this.arrow1filt = { filter: '' }; 
    }
    if (this.rackCount == 2) {
      this.wineImg1 = 'wine1000.png';
      this.wineImg2 = 'wine1000.png';
      this.wineImg3 = this.getWineImage(percent*1.3333);
      this.wineImg4 = 'wine0.png';
      this.arrow1filt = { filter: '' }; 
      this.arrow2filt = { filter: '' };
    }
    if (this.rackCount == 3) {
      this.wineImg1 = 'wine1000.png';
      this.wineImg2 = 'wine1000.png';
      this.wineImg3 = 'wine1000.png';
      this.wineImg4 = this.getWineImage(percent);
      this.arrow1filt = { filter: '' }; 
      this.arrow2filt = { filter: '' };
      this.arrow3filt = { filter: '' };
    }
  }

  public getWineImage(percent: number): string {
    if (percent >= 100) {
      return 'wine1000.png';
    }
    //  else if (percent >= 87.5) {
    //   return 'wine875.png';
    // }
    else if (percent >= 75) {
      return 'wine750.png';
    }
    //  else if (percent >= 62.5) {
    //   return 'wine625.png';
    // }
     else if (percent >= 50) {
      return 'wine500.png';
    }
    //  else if (percent >= 37.5) {
    //   return 'wine375.png';
    // }
     else if (percent >= 25) {
      return 'wine250.png';
    }
    //  else if (percent >= 12.5) {
    //   return 'wine125.png';
    // }
     else {
      return 'wine0.png';
    }

    return 'wine.png'; // remove after images are added
  }

  public calculateABV(startSpecificGravity: number, endSpecificGravity: number): number {
    var alc: number = (startSpecificGravity - endSpecificGravity) * 131.25;

    alc = Math.round(alc * 100) / 100; // Round to 2 decimal places

    return alc;
  }

  public getProgress(startDate: string | Date): number {
    // Convert string to Date if needed
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    const today = new Date();

    // Calculate difference in milliseconds
    const diffInMs = today.getTime() - start.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    // Calculate progress as percentage of 120 days fermentation period
    let progress = (diffInDays / 120) * 100;

    // Clamp progress between 0 and 100
    progress = Math.min(Math.max(progress, 0), 100);

    // Round to nearest integer
    progress = Math.round(progress);

    // Adjust progress based on rackCount (assuming this.rackCount is set elsewhere)
    if (this.rackCount === 0) {
      progress = Math.min(progress, 25);
    } else if (this.rackCount === 1) {
      progress = Math.min(progress, 50);
    } else if (this.rackCount === 2) {
      progress = Math.min(progress, 75);
    } else if (this.rackCount >= 3) {
      progress = Math.min(progress, 100);
    }

    console.log(`Progress for ${this.wine.name}: ${progress}%`);

    return progress;
  }

  constructor(private wineService: WineService) {}

  @Output() onDeleted = new EventEmitter<void>();

  deleteWine(event: MouseEvent) {
    event.stopPropagation();
    if (this.wine.id === undefined) return;
    this.showDeleteConfirm = true;
  }

  cancelDelete(event: MouseEvent) {
    event.stopPropagation();
    this.showDeleteConfirm = false;
  }

  confirmDelete(event: MouseEvent) {
    event.stopPropagation();
    if (this.wine.id === undefined) return;
    this.isDeleting = true;
    this.wineService.removeWine(this.wine.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.showDeleteConfirm = false;
        this.onDeleted.emit(); // <-- notify parent
      },
      error: (err) => {
        console.error(err);
        this.isDeleting = false;
        this.showDeleteConfirm = false;
      }
    });
  }




}
