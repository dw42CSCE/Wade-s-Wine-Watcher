import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WineDashboard } from './wine-dashboard/wine-dashboard';
import { WineDescription } from './wine-description/wine-description';
import { Login } from './login/login';
import { NewWine } from './newwine/newwine';

export const routes: Routes = [
  { path: '', redirectTo: '/wine-dashboard', pathMatch: 'full' },
  { path: 'wine-dashboard', component: WineDashboard },
  { path: 'wine/:id', component: WineDescription },
  { path: 'login', component: Login },
  { path: 'newwine', component: NewWine }, // Assuming new wine uses the same component
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
