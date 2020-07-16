import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemindersDetailComponent } from './reminders/reminders-detail/reminders-detail.component';

const routes: Routes = [
  { path: 'reminders/:mid', component: RemindersDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  RemindersDetailComponent
]
