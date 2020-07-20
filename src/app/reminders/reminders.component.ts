import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RemindersService } from '../reminders.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  public dataSource = null;
  private doctorId = 1;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private remindersService: RemindersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.remindersService.getPatientMappingByDoctor(this.doctorId).subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
    /*this.dataSource = new MatTableDataSource(this.remindersService.getPatientMappingByDoctor(this.doctorId));
    this.loadedRemiders = new MatTableDataSource(result);
    this.loadedRemiders.paginator = this.paginator;*/
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
