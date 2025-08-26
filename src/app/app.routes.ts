// import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'example',
  //   component: ExampleComponent,
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [],
    loadComponent: () => import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [],
    loadComponent: () => import('./modules/auth/pages/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: 'not-found',
        loadComponent: () => import('./modules/error-page/pages/not-found/not-found.component').then(m => m.NotFoundComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
