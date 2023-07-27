import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ReviewComponent } from './review/review.component';
import { authGuard } from './_auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RaiseProductComponent } from './raise-product/raise-product.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: "home", component: HomeComponent},
  {path: "user", component: UserComponent, canActivate: [authGuard], data: {roles: ["User"]} }, 
  {path: "admin", component: AdminComponent, canActivate: [authGuard], data: {roles: ["Admin"]} }, 
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "products/:searchString", component: ProductsComponent, canActivate: [authGuard], data: {roles: ["User"]}},
  {path: "product-detail/:pid", component: ProductDetailComponent, canActivate: [authGuard], data: {roles: ["User"]}},
  {path: "review/:pid", component: ReviewComponent, canActivate: [authGuard], data: {roles: ["User"]}},
  {path: "forbidden", component: ForbiddenComponent},
  {path: "raise-product", component: RaiseProductComponent, canActivate: [authGuard], data: {roles: ["User"]}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
