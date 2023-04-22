import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InsertarComponent } from './insertar/insertar.component';



const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'home', component: HomeComponent },
{ path: 'insertar', component: InsertarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
