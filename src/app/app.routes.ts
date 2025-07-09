import { Routes } from '@angular/router';
import { WineDashboard } from './wine-dashboard/wine-dashboard';
import { WineDescription } from './wine-description/wine-description';
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', redirectTo: '/wine-dashboard', pathMatch: 'full' },
    { path: 'wine-dashboard', component: WineDashboard },
    { path: 'wine/:id', component: WineDescription },
    { path: 'login', component: Login},
];
