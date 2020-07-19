import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RemindersService} from './reminders.service';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { RemindersComponent } from './reminders/reminders.component';
import { RemindersDetailComponent } from './reminders/reminders-detail/reminders-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RemindersComponent,
    RemindersDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [RemindersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
