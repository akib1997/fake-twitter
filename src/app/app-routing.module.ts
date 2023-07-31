import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AppGuard } from '@app/guards/app.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    canActivate: [AppGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
