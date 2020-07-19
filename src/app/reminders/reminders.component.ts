import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RemindersService } from '../reminders.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  public dataSource = null;
  private doctorId = 1;

  constructor(
    private remindersService: RemindersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.dataSource = this.remindersService.getPatientMappingByDoctor(this.doctorId);
  }

  title = 'pitt-clinic-reminder-dashboard';
  displayedColumns: string[] = [
    'patientName',
    'unfinishedHigh',
    'unfinishedMiddle',
    'unfinishedLow'
  ];

  getReminderList(row){
    this.router.navigate([`/reminders/${row.mid}`]);
  }
}
