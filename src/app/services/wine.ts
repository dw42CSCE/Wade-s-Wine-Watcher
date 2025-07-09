import { Injectable } from '@angular/core';
import { Wine } from '../models/wine.model';

@Injectable({
  providedIn: 'root'
})
export class WineService{

allwines: Wine[] = [
  {
    id: 1,
    name: 'Chardonnay',
    ingredients: ['Chardonnay grapes', 'Yeast'],
    description: 'A popular white wine with a rich, buttery flavor.',
    startDate: new Date(2025, 4, 1),
    rackDates: [new Date(2025, 5, 1), new Date(2025, 6, 1)],
    users: [1, 2],
    startSpecificGravity: 1.090,
    endSpecificGravity: 0.990
  },
  {
    id: 2,
    name: 'Merlot',
    ingredients: ['Merlot grapes', 'Yeast'],
    description: 'A smooth red wine with soft tannins and fruity notes.',
    startDate: new Date(2025, 5, 1),
    rackDates: [new Date(2025, 6, 1)],
    users: [1, 3],
    startSpecificGravity: 1.080,
    endSpecificGravity: 1.000
  },
  {
    id: 3,
    name: 'Cabernet Sauvignon',
    ingredients: ['Cabernet grapes', 'Yeast'],
    description: 'A bold red wine with dark fruit flavors and savory tastes.',
    startDate: new Date(2025, 6, 1),
    rackDates: [new Date(2025, 7, 1)],
    users: [],
    startSpecificGravity: 1.085,
    endSpecificGravity: 0.995
  },
  {
    id: 4,
    name: 'Pinot Noir',
    ingredients: ['Pinot Noir grapes', 'Yeast'],
    description: 'A light-bodied red wine known for its bright red fruit flavors.',
    startDate: new Date(2025, 7, 1),
    rackDates: [new Date(2025, 8, 1)],
    users: [],
    startSpecificGravity: 1.075,
    endSpecificGravity: 0.990
  },
  {
    id: 5,
    name: 'Sauvignon Blanc',
    ingredients: ['Sauvignon Blanc grapes', 'Yeast'],
    description: 'A crisp, dry, and refreshing white wine.',
    startDate: new Date(2025, 5, 15),
    rackDates: [new Date(2025, 6, 15)],
    users: [],
    startSpecificGravity: 1.070,
    endSpecificGravity: 0.985
  },
  {
    id: 6,
    name: 'Syrah',
    ingredients: ['Syrah grapes', 'Yeast'],
    description: 'A full-bodied red wine with spicy and dark berry flavors.',
    startDate: new Date(2025, 8, 1),
    rackDates: [new Date(2025, 9, 1)],
    users: [],
    startSpecificGravity: 1.095,
    endSpecificGravity: 0.998
  },
  {
    id: 7,
    name: 'Zinfandel',
    ingredients: ['Zinfandel grapes', 'Yeast'],
    description: 'A robust red wine with jammy fruit and pepper notes.',
    startDate: new Date(2025, 4, 20),
    rackDates: [new Date(2025, 5, 20)],
    users: [],
    startSpecificGravity: 1.088,
    endSpecificGravity: 0.992
  },
  {
    id: 8,
    name: 'Riesling',
    ingredients: ['Riesling grapes', 'Yeast'],
    description: 'A sweet white wine with floral and fruity notes.',
    startDate: new Date(2025, 5, 25),
    rackDates: [new Date(2025, 6, 25)],
    users: [],
    startSpecificGravity: 1.065,
    endSpecificGravity: 0.980
  },
  {
    id: 9,
    name: 'Malbec',
    ingredients: ['Malbec grapes', 'Yeast'],
    description: 'A dark, full-bodied red wine with rich fruit flavors.',
    startDate: new Date(2025, 6, 10),
    rackDates: [new Date(2025, 7, 10)],
    users: [],
    startSpecificGravity: 1.090,
    endSpecificGravity: 0.995
  },
  {
    id: 10,
    name: 'Gewürztraminer',
    ingredients: ['Gewürztraminer grapes', 'Yeast'],
    description: 'A highly aromatic white wine with lychee and rose notes.',
    startDate: new Date(2025, 7, 5),
    rackDates: [new Date(2025, 8, 5)],
    users: [],
    startSpecificGravity: 1.072,
    endSpecificGravity: 0.982
  }
];

  
  getWines(userId: number): Wine[] {
    return this.allwines.filter(wine => wine.users.includes(userId));
  }
  constructor() { }
}
