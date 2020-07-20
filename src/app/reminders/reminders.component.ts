import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RemindersService } from '../reminders.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  public dataSource = null;
  private doctorId = 1;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private remindersService: RemindersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.remindersService.getPatientMappingByDoctor(this.doctorId).subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    /*this.dataSource = new MatTableDataSource(this.remindersService.getPatientMappingByDoctor(this.doctorId));
    this.loadedRemiders = new MatTableDataSource(result);
    this.loadedRemiders.paginator = this.paginator;*/
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
