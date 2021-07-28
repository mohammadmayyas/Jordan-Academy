import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
  {
    path: 'public',
    loadChildren: () => import("./modules/public/public.module").then(m => m.PublicModule)
    
  },
  {
    path: 'client',
    loadChildren: () => import("./modules/client/client.module").then(m => m.ClientModule),
  },
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
