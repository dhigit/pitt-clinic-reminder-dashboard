import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemindersComponent } from './reminders/reminders.component';
import { RemindersDetailComponent } from './reminders/reminders-detail/reminders-detail.component';
import { RemindersCreateComponent } from './reminders-create/reminders-create.component';
import { LoginComponent } from './login/login.component';
//import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: 'reminders',
    pathMatch: 'full'
  },
  {
    path: 'reminders',
    component: RemindersComponent
  },
  {
    path: 'reminders/:mid',
    component: RemindersDetailComponent
  },
  {
    path: 'reminders/create/:mid',
    component: RemindersCreateComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
