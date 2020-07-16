import { Component, OnInit } from '@angular/core';
import { RemindersService } from './reminders.service';
import {MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public dataSource = null;
  private doctorId = 1;

  constructor(private remindersService: RemindersService){}

  ngOnInit(): void {
    this.dataSource = this.remindersService.getPatientMappingByDoctor(this.doctorId);
  }

  title = 'pitt-clinic-reminder-dashboard';
  displayedColumns: string[] = [
    'patientName',
    'unfinishedHigh',
    'unfinishedMiddle',
    'unfinishedLow',
    'mid'
  ];

}
