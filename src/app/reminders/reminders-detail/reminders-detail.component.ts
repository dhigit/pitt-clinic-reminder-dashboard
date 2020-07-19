import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RemindersService } from 'src/app/reminders.service';

@Component({
  selector: 'app-reminders-detail',
  templateUrl: './reminders-detail.component.html',
  styleUrls: ['./reminders-detail.component.css']
})
export class RemindersDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private remindersService: RemindersService
  ) { }

  loadedRemiders = null;
  mid = -1;

  ngOnInit(): void {
    this.mid = +this.activatedRoute.snapshot.paramMap.get('mid');
    this.remindersService.getRemindersByMid(this.mid).subscribe(result => {
      this.loadedRemiders = result;
      console.log(this.loadedRemiders);
    });
  }

  displayedColumns: string[] = [
    'title',
    'priority',
    'duration',
    'createdTime',
    'overallStatus'
  ];

}
