import { Routes } from '@angular/router';

export const routes: Routes = [
  // ✅ ให้ root เด้งไปหน้า todo ก่อน
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full',
  },

  {
    path: '',
    canActivate: [],
    children: [
      // ✅ route หน้า Todo
      {
        path: 'todo',
        loadComponent: () =>
          import('./modules/todo/todo.component').then(
            (m) => m.TodoComponent
          ),
      },

      // ✅ route หน้า not-found
      {
        path: 'not-found',
        loadComponent: () =>
          import('./modules/error-page/pages/not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
    ],
  },

  // ✅ wildcard -> not-found
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
