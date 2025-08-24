// import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'example',
  //   component: ExampleComponent,
  // },
  {
    path: '',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
  // {
  //   path: 'test',
  //   canActivate: [],
  //   loadComponent: () => import('./modules/login/pages/login/login.component').then(m => m.LoginComponent),
  // },
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
