import { Component, OnInit } from '@angular/core';
import { RemindersService } from '../reminders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reminders-create',
  templateUrl: './reminders-create.component.html',
  styleUrls: ['./reminders-create.component.css']
})
export class RemindersCreateComponent implements OnInit {

  mappingInfo = null;
  mid = -1;

  constructor(
    private remindersService: RemindersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mid = +this.activatedRoute.snapshot.paramMap.get('mid');
    this.remindersService.getMappingById(this.mid).subscribe(result=> {
      this.mappingInfo = result;
    });
  }

}
