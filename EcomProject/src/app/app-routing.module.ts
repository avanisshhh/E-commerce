import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { NoPageComponent } from './no-page/no-page.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: SellerAuthComponent,
    path: 'seller-auth',
  },
  {
    component: SellerHomeComponent,
    path: 'seller-home',
    canActivate: [AuthGuard],
  },
  // {
  //   component: NoPageComponent,
  //   path: '**', //404 wildcard url
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
